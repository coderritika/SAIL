const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please tell use your mame']

    },
    email:{
          type:String,
          required:[true,"Email address is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required for login and signup"]
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User;