const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  signUpDate: {
    type: Date,
    default: Date.now
  },
  location: String,
  radius: Number,
  phoneNumber: String,
  notification: {
    onOffEmail: Boolean,
    onOffSms: Boolean,
    frequencyEmail: String,
    frequencySms: String,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;