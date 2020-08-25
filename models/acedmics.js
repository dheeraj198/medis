const mongoose = require('mongoose');
const acedmicsfeeSchema = new mongoose.Schema({
  rollno: {
    type: Number,
  },
  DUAcd: {
    type: String,
  },
  DUAcdAmt: {
    type: String,
  }
});
const AcedmicsFee = mongoose.model('AcedmicsFee', acedmicsfeeSchema);

module.exports = AcedmicsFee;
