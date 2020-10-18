
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const multer = require('multer');

var fs = require('fs');
var path = require('path');
require('dotenv/config');

const Student = require('../models/student');
const AcedmicsFee = require('../models/acedmics');
const HostelFee = require('../models/hostel');
const Elective = require('../models/elective');
// const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// login Page
router.get('/alogin', (req, res) => res.render('alogin'));

router.get('/record', (req, res) =>
  res.render('record')
);

// router.get("/record", function(req, res){
//   Student.find({}, function(err, students){
//     res.render("record", {students: students});
//   });
// });

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


router.get("/students/:studentrollno", function(req, res){
const requestedStudentId = req.params.studentrollno;
  Student.findOne({rollno: requestedStudentId}, function(err, student){
    Elective.findOne({rollno: requestedStudentId}, function(err, elective){
      AcedmicsFee.findOne({rollno: requestedStudentId}, function(err, acd){
        HostelFee.findOne({rollno: requestedStudentId}, function(err, hos){


    res.render("post", {
      name: student.name,
      rollno:student.rollno,
      mobileno:student.mobileno,
      branch: elective.branch,
      semester:elective.semester,
      elective:elective.elective,
      DUAcd:acd.DUAcd,
      DUAcdAmt:acd.DUAcdAmt,
      DUHostel:hos.DUHostel,
      DUHostelAmt:hos.DUHostelAmt

    });
    });
    });
  });
});
});
router.get("/electives/:electiverollno", function(req, res){
const requestedElectiveId = req.params.electiverollno;
Student.findOne({rollno: requestedElectiveId}, function(err, student){
  Elective.findOne({rollno: requestedElectiveId}, function(err, elective){
    AcedmicsFee.findOne({rollno: requestedElectiveId}, function(err, acd){
      HostelFee.findOne({rollno: requestedElectiveId}, function(err, hos){


  res.render("post", {
    name: student.name,
    rollno:student.rollno,
    mobileno:student.mobileno,
    branch: elective.branch,
    semester:elective.semester,
    elective:elective.elective,
    DUAcd:acd.DUAcd,
    DUAcdAmt:acd.DUAcdAmt,
    DUHostel:hos.DUHostel,
    DUHostelAmt:hos.DUHostelAmt
  });
  });
  });
});
});
});

router.get("/acds/:acdrollno", function(req, res){
const requestedAcedmicsFeeId = req.params.acdrollno;
  Student.findOne({rollno: requestedAcedmicsFeeId}, function(err, student){
    Elective.findOne({rollno: requestedAcedmicsFeeId}, function(err, elective){
      AcedmicsFee.findOne({rollno: requestedAcedmicsFeeId}, function(err, acd){
        HostelFee.findOne({rollno: requestedAcedmicsFeeId}, function(err, hos){


    res.render("post", {
      name: student.name,
      rollno:student.rollno,
      mobileno:student.mobileno,
      branch: elective.branch,
      semester:elective.semester,
      elective:elective.elective,
      DUAcd:acd.DUAcd,
      DUAcdAmt:acd.DUAcdAmt,
      DUHostel:hos.DUHostel,
      DUHostelAmt:hos.DUHostelAmt

    });
    });
    });
  });
});
});
router.get("/hoss/:hosrollno", function(req, res){
const requestedHostelFeeId = req.params.hosrollno;
Student.findOne({rollno: requestedHostelFeeId}, function(err, student){
  Elective.findOne({rollno: requestedHostelFeeId}, function(err, elective){
    AcedmicsFee.findOne({rollno: requestedHostelFeeId}, function(err, acd){
      HostelFee.findOne({rollno: requestedHostelFeeId}, function(err, hos){


  res.render("post", {
    name: student.name,
    rollno:student.rollno,
    mobileno:student.mobileno,
    branch: elective.branch,
    semester:elective.semester,
    elective:elective.elective,
    DUAcd:acd.DUAcd,
    DUAcdAmt:acd.DUAcdAmt,
    DUHostel:hos.DUHostel,
    DUHostelAmt:hos.DUHostelAmt
  });
  });
  });
});
});
});

router.get("/dashboard" , function(req,res){
   res.render("dashboard");
});
module.exports = router;
