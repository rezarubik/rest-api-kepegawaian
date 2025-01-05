const express = require("express");
const router = express.Router();
const employeeProfileController = require("../controller/employeeProfileController");

// todo: CRUD endpoints for Employee Profile
router.post("/", employeeProfileController.createEmployeeProfile); // note: Create employee profile
router.get("/", employeeProfileController.getAllEmployeeProfiles); // note: Get all employee profiles
router.get("/:id", employeeProfileController.getEmployeeProfileById); // note: Get employee profile by ID
router.put("/:id", employeeProfileController.updateEmployeeProfile); // note: Update employee profile by ID
router.delete("/:id", employeeProfileController.deleteEmployeeProfile); // note: Delete employee profile by ID

module.exports = router;
