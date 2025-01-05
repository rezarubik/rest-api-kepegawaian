const express = require("express");
const router = express.Router();
const educationController = require("../controller/educationController");

// CRUD endpoints for Education
router.post("/", educationController.createEducation); // note: Create education
router.get("/", educationController.getAllEducations); // note: Get all education records
router.get("/:id", educationController.getEducationById); // note: Get education by ID
router.put("/:id", educationController.updateEducation); // note: Update education by ID
router.delete("/:id", educationController.deleteEducation); // note: Delete education by ID

module.exports = router;
