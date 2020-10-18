const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// Load Admin User model
const Admin = require('../models/admin');

router.get('/alogin', (req, res) => res.render('alogin'));

//Admin Register Page
router.get('/aregister', (req, res) => res.render('aregister'));

// Register
router.post('/aregister', (req, res) => {
  const { aname, aemail, apassword, apassword2 } = req.body;
  let errors = [];

  // if (!aname || !aemail || !apassword || !apassword2) {
  //   errors.push({ msg: 'Please enter all fields' });
  // }

  if (apassword.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('aregister', {errors,aname,aemail,apassword,apassword2});
   } else {
    Admin.findOne({ aemail: aemail }).then(auser => {
      if (auser) {
        errors.push({ msg: 'Email already exists' });
        res.render('aregister', {errors,name,email,password,password2});
      } else {
        const newAdmin = new Admin({
          aname,
          aemail,
          apassword
        });

//         console.log(newUser);
//         res.send("hello");
//       }
//     });
//   }
// });
// //
//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newAdmin.apassword, salt, (err, hash) => {
//             if (err) throw err;
//             newAdmin.apassword = hash;
            newAdmin
              .save()
              .then(auser => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/auser/alogin');
              })
              .catch(err => console.log(err));

      }
    });
  }
});

//Login
router.post('/alogin',(req,res)=>{
           const apassword = req.body.apassword;
           Admin.findOne({email:req.body.email},function(err,admin){
             if(err){
             console.log(err);
             }
             else{
               if(admin){
                 if(admin.apassword===apassword){
                   adminFlag=1;
                   res.redirect("/record")
                 }
                 else{
                   res.render("alogin")
                 }
               }
             }
           })

          })

// router.post('/alogin', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/record',
//     failureRedirect: '/auser/alogin',
//     failureFlash: true
//   })(req, res, next);
// });

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/auser/alogin');
});

module.exports = router;
