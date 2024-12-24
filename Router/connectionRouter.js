const express = require("express");
const router = express.Router();
const connectioncontroller = require("../Controllers/connection_controller")
const authentication = require("../middleware/auth")

// http://localhost:8000/api/v1/connection/

router.post("/",authentication, connectioncontroller.sendrequest)
router.patch("/:id/accept",authentication, connectioncontroller.accept)
router.patch("/:id/decline",authentication,connectioncontroller.decline)


module.exports = router
