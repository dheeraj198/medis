const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  branch: {
    type: String,
  },
  rollno: {
    type: Number,
  },
  mobileno: {
    type: Number,
  },
  email: {
    type: String,
  },
  DUAcd: {
    type: String,
  },
  DUHostel: {
    type: String,
  }
});
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
