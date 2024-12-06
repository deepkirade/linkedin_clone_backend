const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        
    },
    email: {
        type: String,
     
    },
    profile: {
        type: String,
    
    },
    password: {
        type:String
    },
 

    
}, { timestamps: true });


const User = new mongoose.model("User", userSchema)
module.exports = User;