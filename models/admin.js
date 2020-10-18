const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  aname: {
    type: String,

  },
  aemail: {
    type: String,

  },
  apassword: {
    type: String,

  },
  apassword2: {
    type: String,

  }
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
