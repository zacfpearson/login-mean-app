const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create blog schema & model
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email feild is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password feild is required']
  },
  firstName:{
    type: String,
  },
  lastName:{
    type: String,
  }

});

const User = mongoose.model('user',UserSchema);

module.exports = User;