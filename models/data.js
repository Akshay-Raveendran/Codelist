const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: 'Description can\'t be empty',
  },
  url: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  site: {
    type: String,
    required: true
  },
  done: {
    type: String,
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  }
});

const data = mongoose.model('data', UserSchema);

module.exports = data;
