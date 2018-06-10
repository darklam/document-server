const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({

  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'readOnly'],
  },

});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
