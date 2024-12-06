const express = require("express");
const router = express.Router();
const authcontroller = require("../Controllers/user_controller")
const passport = require("../utils/passport")

router.route("/test").get(authcontroller .home);
router.post("/register", authcontroller.register)
router.post("/login", authcontroller.login)
router.route("/googlelogin").get(passport.passportconfig.authenticate('google',{scope:['profile','email']}), authcontroller.loginwithgoogle);
router.route("/googlelogin/callback").get(passport.passportconfig.authenticate("google",{failureRedirect:'http://localhost:8000/api/v1/user/failed'}), authcontroller.loginwithgooglecallback);
router.route("/failed")
.get(function(req,res){
    res.send("failed to login with google")
})
router.route("/success")
.get(function(req,res){
  const token=   req.query
    res.send({message:"success to login with google",token1:token})

})

module.exports = router