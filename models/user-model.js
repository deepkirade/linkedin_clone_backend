const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name: {
        type: String,

    },
    email: {
        type: String,

    },
    profile: {
        type: String,
        default: ""

    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'company']
    },
    skills: [{
        type: String
    }],
    status: {
        type: String,
        default: "Offline"

    },
    lastSeen:
    {
        type: Date, default: Date.now

    },



}, { timestamps: true });


const User = new mongoose.model("User", userSchema)
module.exports = User;