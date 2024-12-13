const express = require("express");
const router = express.Router();
const connectioncontroller = require("../Controllers/connection_controller")
const authorization = require("../middleware/auth")

// http://localhost:8000/api/v1/connection/

router.post("/",authorization, connectioncontroller.sendrequest)
router.patch("/:id/accept",authorization, connectioncontroller.accept)
router.patch("/:id/decline",authorization,connectioncontroller.decline)


module.exports = router
