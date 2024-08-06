const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type:String, required:true},
    email: { type: String, required:true, unique:true },
    password: {type : String , required:true}, 
    pic: {
        type: "String",
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        required: false,
      },

      isAdmin: {
        type: Boolean,
        default: false,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      activationCode: {type: Number, required:true},

},
 {timestaps: true }
);

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword,this.password);
};

const User = mongoose.model('User',userSchema);

module.exports = User;