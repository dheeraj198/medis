const express = require('express');
//const expressLayouts = require('express-ejs-layouts');
const request= require("request");
const https=require("https");
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const ejs = require('ejs');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');


// Passport Config
require('./config/passport')(passport);

//DB config
//const db = require('./config/keys').MongoURI;

mongoose.connect('mongodb+srv://dheeraj:Dheeraj123@@cluster0.gauld.mongodb.net/User',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose.connect("mongodb://localhost:27017/medis",
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

const app = express();
app.use(express.static("public"));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view engine",'ejs');


// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/',require('./routes/index.js'));
app.use('/user',require('./routes/user.js'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("Server started on port ", PORT);
});
