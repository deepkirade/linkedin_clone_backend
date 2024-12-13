const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()

const Googleprovider = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK


},async function (access, refresh, profile, cb){
    cb(null,profile)
})
module.exports = Googleprovider
 

