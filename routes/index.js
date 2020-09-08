
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/');
	},
	filename: (req, file, cb)= > cb(null, Date.now() + file.originalname);  instead of   cb(null, new Date().toISOString() + file.originalname);
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
router.post('/acedmics', upload.single('Image') ,function(req,res){
 const acd= new AcedmicsFee({
   rollno:req.body.studentRollno,
   DUAcd:req.body.studentDUAcd,
   DUAcdAmt:req.body.studentDUAcdAmt,
   Image:req.file.path
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


module.exports = router;
