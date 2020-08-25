
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Student = require('../models/student');
const AcedmicsFee = require('../models/acedmics');
const HostelFee = require('../models/hostel');
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
 const stdacd= new AcedmicsFee({
   DUAcd:req.body.studentDUAcd,
   DUAcdAmt:req.body.studentDUAcdAmt
 });
 stdacd.save(function(err){
   if (!err){
       res.redirect("/hostel");
   }
 });
});

router.get("/hostel" , function(req,res){
   res.render("hostel");
});
router.post('/hostel',function(req,res){
 const stdhos= new HostelFee({
   DUHostel:req.body.studentDUHostel,
   DUHostelAmt:req.body.studentDUHostelAmt
 });
 stdhos.save(function(err){
   if (!err){
       res.redirect("/record");
   }
 });
});

router.get("/success" , function(req,res){
   res.render("success");
});

router.get("/record", function(req, res){
  Student.find({}, function(err, students){
    res.render("record", {students: students});
  });
});

router.get("/basicdetailsrecord", function(req, res){
  Student.find({}, function(err, students){
    res.render("basicdetailsrecord", {students: students});
  });
});

router.get("/acedmicsrecord", function(req, res){
  Student.find({}, function(err, students){
    res.render("acedmicsrecord", {students: students});
  });
});
router.get("/hostelrecord", function(req, res){
  Student.find({}, function(err, students){
    res.render("hostelrecord", {students: students});
  });
});

router.get("/students/:studentId", function(req, res){

const requestedStudentId = req.params.studentId;

  Student.findOne({_id: requestedStudentId}, function(err, student){
    res.render("post", {
      name: student.name,
      branch: student.branch
    });
  });

});

module.exports = router;
