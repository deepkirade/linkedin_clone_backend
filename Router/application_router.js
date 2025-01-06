const express = require("express");
const router = express.Router();
const authrization = require("../middleware/auth.js")
const application_controller = require("../Controllers/application_controller.js") 




// // http://localhost:8000/api/v1/application/


router.route("/applyjob/:id").get(authrization, application_controller.applyjob );
router.route("/getAppliedjobs").get(authrization, application_controller. getAppliedjobs );
router.route("/getapplicants/:id").get(authrization, application_controller. getapplicants );



module.exports = router;