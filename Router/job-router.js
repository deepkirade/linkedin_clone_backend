const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth.js")
const job_controller = require("../Controllers/job_controller.js") 

// // http://localhost:8000/api/v1/job/
router.route("/recommend/job").get( authentication, job_controller.recommendedjob);
router.route("/recommed/connection").get( authentication, job_controller.recommededconnection);
router.route("/adminjobs").get(authentication, job_controller.getadminjob)
router.route("/post").post( authentication, job_controller.postjob);
router.route("/alljobs").get( authentication, job_controller.getalljob);
router.route("/:id").get( authentication, job_controller.getjobsbyid);





module.exports = router;
