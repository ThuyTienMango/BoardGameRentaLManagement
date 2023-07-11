const mongoose = require('mongoose');

const Schema = mongoose.Schema;

userSchema = new Schema(
  {
      name: { type: String, required: true },
      username: { type: String, required: true, 
        // unique: true 
      },
      email: { type: String, required: true, 
        // unique: true 
      },
      password: { type: String, required: true },
      tel: { type: String, required: true },
      identity: { type: String, required: true },
      avatar: String,
      avatarUrl: String,
      address: { type: String, required: true },
  },
  {
      timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);;

