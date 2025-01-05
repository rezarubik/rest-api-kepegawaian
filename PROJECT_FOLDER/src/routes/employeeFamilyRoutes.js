const express = require("express");
const router = express.Router();
const employeeFamilyController = require("../controller/employeeFamilyController");

// todo: CRUD endpoints for Employee Family
router.post("/", employeeFamilyController.createEmployeeFamily); // note: Create employee family
router.get("/", employeeFamilyController.getAllEmployeeFamilies); // note: Get all employee families
router.get("/:id", employeeFamilyController.getEmployeeFamilyById); // note: Get employee family by ID
router.put("/:id", employeeFamilyController.updateEmployeeFamily); // note: Update employee family by ID
router.delete("/:id", employeeFamilyController.deleteEmployeeFamily); // note: Delete employee family by ID

module.exports = router;
