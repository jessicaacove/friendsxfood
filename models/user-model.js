const mongoose = require('mongoose');

const Schema = mongoose.Schema;




const UserSchema = new Schema(
{
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  username: {
    type: String
  },
  encryptedPassword: {
    type: String
  }
});



const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
