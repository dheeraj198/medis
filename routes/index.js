
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

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
   branch:req.body.studentBranch,
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
   res.render("elective",{student :student});
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
 const acd= new AcedmicsFee({
   rollno:req.body.studentRollno,
   DUAcd:req.body.studentDUAcd,
   DUAcdAmt:req.body.studentDUAcdAmt
 });
 acd.save(function(err){
   if (!err){
       res.redirect("/hostel");
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
router.get("/electiverecord", function(req, res){
  Elective.find({}, function(err, electives){
    res.render("electiverecord", {electives: electives});
  });
});

router.get("/acedmicsrecord", function(req, res){
  AcedmicsFee.find({}, function(err, acds){
    res.render("acedmicsrecord", {acds: acds});
  });
});
router.get("/hostelrecord", function(req, res){
  HostelFee.find({}, function(err, hoss){
    res.render("hostelrecord", {hoss: hoss});
  });
});


router.get("/students/:studentId", function(req, res){
const requestedStudentId = req.params.studentId;
  Student.findOne({_id: requestedStudentId}, function(err, student){
    res.render("post", {
      name: student.name,
      rollno:student.rollno,
      mobileno:student.mobileno
    });
  });
});

router.get("/electives/:electiveId", function(req, res){
const requestedElectiveId = req.params.electiveId;
  Elective.findOne({_id: requestedElectiveId}, function(err, elective){
    res.render("post", {
      rollno:elective.rollno,
      branch: elective.branch,
      semester:elective.semester,
      elective:elective.elective
    });
  });
});


module.exports = router;
