const express = require("express");
const router = express.Router();
// const connectioncontroller = require("../Controllers/connection_controller")
const authentication = require("../middleware/auth")
const companycontroller = require('../Controllers/company_controller')

// http://localhost:8000/api/v1/company/

router.post("/register",authentication,companycontroller.registerCompany)
router.get("/getallcompany", companycontroller.getallCompany)
router.get("/getcompany",authentication, companycontroller.getCompany)


module.exports = router