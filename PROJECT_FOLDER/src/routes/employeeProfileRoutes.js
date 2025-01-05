const express = require("express");
const router = express.Router();
const employeeProfileController = require("../controller/employeeProfileController");

// CRUD endpoints for Employee Profile
router.post("/", employeeProfileController.createEmployeeProfile); // Create employee profile
router.get("/", employeeProfileController.getAllEmployeeProfiles); // Get all employee profiles
router.get("/:id", employeeProfileController.getEmployeeProfileById); // Get employee profile by ID
router.put("/:id", employeeProfileController.updateEmployeeProfile); // Update employee profile by ID
router.delete("/:id", employeeProfileController.deleteEmployeeProfile); // Delete employee profile by ID

module.exports = router;
