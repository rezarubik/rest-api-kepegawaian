const express = require("express");
const { getEmployeeReport } = require("../controller/reportController");

const router = express.Router();

router.get("/employee-report", getEmployeeReport);

module.exports = router;
