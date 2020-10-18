const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  apassword2: {
    type: String,

  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
