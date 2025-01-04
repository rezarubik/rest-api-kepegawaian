const express = require("express");
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
  createOneEmployee,
  updateOneEmployee,
  deleteOneEmployee,
} = require("../controller/employeeController");

const router = express.Router();

router.get("/", getAllEmployees);

router.get("/all", getEmployees); // note: Just get all employee from employee table
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.put("/:id", updateEmployee); // note: Update Employee with it's relation
router.patch("/:id", updateOneEmployee); // note: Update Employee without it's relation
router.delete("/:id", deleteEmployee); // note: Delete Employee with it's relation
// todo: CRUD one data in Employee Table
router.post("/create-one", createOneEmployee);
router.delete("/one/:id", deleteOneEmployee); // note: Delete Employee without it's relation

module.exports = router;
