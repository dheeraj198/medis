const mongoose = require('mongoose');
const electiveSchema = new mongoose.Schema({
  rollno: {
    type: Number,
  },
  branch: {
    type: String,
  },
  semester: {
    type: String,
  },
  elective: {
    type: String,
  }
});
const Elective = mongoose.model('Elective', electiveSchema);

module.exports = Elective;
