const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Student = require('../models/student');

router.get("/", function(req, res){
  res.render("info");
});

router.get("/record", function(req, res){
  Student.find({}, function(err, posts){
    res.render("record", {posts: posts});
  });
});
router.post("/info", function(req, res){
  const student = new Student({
    name: req.body.studentName,
    branch: req.body.studentBranch,
    rollno:req.body.studentRollno,
    mobileno:req.body.studentMobile,
    email:req.body.studentEmail,
    DUAcd:req.body.studentDUAcd,
    DUAcdAmt:req.body.studentDUAcdAmt
  });
  student.save(function(err){
    if (!err){
        res.redirect("/record");
    }
    else{
      res.redirect("/");
    }
  });
});

module.exports = router;

//let posts = [];

// router.get("/" , function(req,res){
//    res.render("info");
// });
// ///////////////////
// router.post('/info',function(req,res){
//  const post ={
//    name:req.body.studentName,
//    branch:req.body.studentBranch
//  };
//  posts.push(post);
//  res.redirect("/record");
// });
//
//
// router.get("/record", function(req, res){
//     res.render("record", { posts:posts});
// });
