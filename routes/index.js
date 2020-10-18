
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const multer = require('multer');

var fs = require('fs');
var path = require('path');
require('dotenv/config');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// const upload = multer({dest: 'uploads/'});

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, './uploads/');
// 	},
// 	filename:  cb(null, new Date().toISOString() + file.originalname)
// 	}
// });
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});
const fileFilter=(req,file,cb)=>{
  if(file.mimetype==="image/jpeg" || file.mimetype === "image/png"){
    cb(null,true);
  }else{
    cb(null,false);
  }
};
const upload = multer({
   storage: storage,
   limits:{
     fileSize:1024*1024*5
   },
   fileFilter:fileFilter

  });

const Student = require('../models/student');
const AcedmicsFee = require('../models/acedmics');
const HostelFee = require('../models/hostel');
const Elective = require('../models/elective');
// login Page
router.get('/', forwardAuthenticated, (req, res) => res.render('login'));

//info
router.get('/info', ensureAuthenticated, (req, res) =>
  res.render('info')
);
///////////////////
router.post('/info',function(req,res){
 const student= new Student({
   name:req.body.studentName,
   rollno:req.body.studentRollno,
   mobileno:req.body.studentMobile,
   email:req.body.studentEmail
 });
 student.save(function(err){
   if (!err){
       res.render ('elective', {student :student});
   }
 });
});
router.get("/elective" , function(req,res){
   res.render("elective");
});
router.post('/elective',function(req,res){
 const elective = new Elective({
   rollno:req.body.studentRollno,
   branch:req.body.branch,
   semester:req.body.studentSemester,
   elective:req.body.studentElective
 });
 elective.save(function(err){
   if (!err){
       res.render("acedmics",{elective :elective});
   }
 });
});
// router.get("/library" , function(req,res){
//    res.render("library");
// });
// router.post('/library',function(req,res){
//  const student= new Student({
//    rollno:req.body.studentRollno,
//    branch:req.body.studentBranch
//  });
//  student.save(function(err){
//    if (!err){
//        res.redirect("/acedmics");
//    }
//  });
// });

router.get("/acedmics" , function(req,res){
   res.render("acedmics");
});
// router.post('/acedmics', upload.single('Image') ,function(req,res){
//  const acd= new AcedmicsFee({
//    rollno:req.body.studentRollno,
//    DUAcd:req.body.studentDUAcd,
//    DUAcdAmt:req.body.studentDUAcdAmt,
//    Image:req.file.path
//  });
//  acd.save(function(err){
//    if (!err){
//        res.render("hostel",{acd :acd});
//    }
//  });
// });
router.post('/acedmics', upload.single('Image') ,function(req,res){
 const acd= new AcedmicsFee({
   rollno:req.body.studentRollno,
   DUAcd:req.body.studentDUAcd,
   DUAcdAmt:req.body.studentDUAcdAmt,
  //  Image:req.file.path
  // Image: {
  //   data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
  //   contentType: 'image/png'
  // }
 });
 acd.save(function(err){
   if (!err){
       res.render("hostel",{acd :acd});
   }
 });
});

router.get("/hostel" , function(req,res){
   res.render("hostel");
});
router.post('/hostel',function(req,res){
 const hos= new HostelFee({
   rollno:req.body.studentRollno,
   DUHostel:req.body.studentDUHostel,
   DUHostelAmt:req.body.studentDUHostelAmt
 });
 hos.save(function(err){
   if (!err){
       res.redirect("/success");
   }
 });
});

router.get("/success" , function(req,res){
   res.render("success");
});


router.get("/dashboard" , function(req,res){
   res.render("dashboard");
});
module.exports = router;
