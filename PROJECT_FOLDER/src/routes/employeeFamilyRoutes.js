const express = require("express");
const router = express.Router();
const employeeFamilyController = require("../controller/employeeFamilyController");

// CRUD endpoints for Employee Family
router.post("/", employeeFamilyController.createEmployeeFamily); // Create employee family
router.get("/", employeeFamilyController.getAllEmployeeFamilies); // Get all employee families
router.get("/:id", employeeFamilyController.getEmployeeFamilyById); // Get employee family by ID
router.put("/:id", employeeFamilyController.updateEmployeeFamily); // Update employee family by ID
router.delete("/:id", employeeFamilyController.deleteEmployeeFamily); // Delete employee family by ID

module.exports = router;
