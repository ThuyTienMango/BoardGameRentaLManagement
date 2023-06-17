const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  identity: {
    type: String,
    required: true
  },
  avatar: String,
  avatarUrl: String,
  address: String
});

module.exports = mongoose.model('User', userSchema);;

