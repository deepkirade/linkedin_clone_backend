const express = require("express");
const router = express.Router();
const authrization = require("../middleware/auth.js")
const message_controller = require("../Controllers/message_controller.js") 




// // http://localhost:8000/api/v1/message/


router.route("/send/:id").post(authrization, message_controller.sendmessage );
router.route("/getmessages/:id").get(authrization, message_controller.getmessages );


module.exports = router;