
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Student = require('../models/student');
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
   branch:req.body.studentBranch,
   rollno:req.body.studentRollno,
   mobileno:req.body.studentMobile,
   email:req.body.studentEmail
 });
 student.save(function(err){
   if (!err){
       res.redirect("/acedmics");
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
router.post('/acedmics',function(req,res){
 const student= new Student({
   DUAcd:req.body.studentDUAcd,
   DUAcdAmt:req.body.studentDUAcdAmt
 });
 student.save(function(err){
   if (!err){
       res.redirect("/hostel");
   }
 });
});

router.get("/hostel" , function(req,res){
   res.render("hostel");
});
router.post('/hostel',function(req,res){
 const student= new Student({
   DUHostel:req.body.studentDUHostel,
   DUHostelAmt:req.body.studentDUHostelAmt
 });
 student.save(function(err){
   if (!err){
       res.redirect("/record");
   }
 });
});

router.get("/success" , function(req,res){
   res.render("success");
});

router.get("/record", function(req, res){
  Student.find({}, function(err, posts){
    res.render("record", {posts: posts});
  });
});
module.exports = router;
