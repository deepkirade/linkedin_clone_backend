const express = require("express");
const router = express.Router();
const authcontroller = require("../Controllers/user_controller")
const passport = require("../utils/passport")
const authorization = require("../middleware/auth")


// http://localhost:8000/api/v1/user/

router.post("/register", authcontroller.register)
router.post("/login", authcontroller.login)
router.route("/googlelogin").get(passport.passportconfig.authenticate('google',{scope:['profile','email']}));
router.route("/googlelogin/callback").get(passport.passportconfig.authenticate("google",{failureRedirect:'http://localhost:8000/api/v1/user/failed'}), authcontroller.loginwithgooglecallback);
router.route("/failed").get(authcontroller.failed)
router.route("/success").get(authcontroller.success)
router.route("/updateuser/:id").put(authorization, authcontroller.updateuser)
router.route("/finduser").post( authcontroller.finduser)


module.exports = router