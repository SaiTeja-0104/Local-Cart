const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["customer","vendor"],
        default: "customer"
    }
},{timestamps:true})


UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(this.password, salt);
    this.password = hashedPass;
    next();
  } catch (err) {
    next(err);
  }
});


UserSchema.methods.comparePassword = async function (candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    }
    catch(err){
        throw err;
    }
}

const User = mongoose.model('User',UserSchema)

module.exports = User