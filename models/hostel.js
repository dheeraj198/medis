const mongoose = require('mongoose');
const hostelfeeSchema = new mongoose.Schema({
  rollno: {
    type: Number,
  },
  DUHostel: {
    type: String,
  },
  DUHostelAmt: {
    type: String,
  }
});
const HostelFee = mongoose.model('HostelFee', hostelfeeSchema);

module.exports = HostelFee;
