const { EmployeeFamily } = require("../models");

// start: Create Employee Family
const createEmployeeFamily = async (req, res) => {
  try {
    const { employeeFamilyData } = req.body;
    const employeeFamily = await EmployeeFamily.create(employeeFamilyData);
    res.status(201).json({
      message: "Employee family created successfully",
      data: employeeFamily,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// end: Create Employee Family

// start: Get All Employee Families
const getAllEmployeeFamilies = async (req, res) => {
  try {
    const employeeFamilies = await EmployeeFamily.findAll();
    res.status(200).json({
      message: "Success Get All Employee Families",
      total: employeeFamilies.length,
      data: employeeFamilies,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// end: Get All Employee Families

// start: Get Employee Family by ID
const getEmployeeFamilyById = async (req, res) => {
  try {
    const employeeFamily = await EmployeeFamily.findByPk(req.params.id);
    if (!employeeFamily) {
      return res.status(404).json({ message: "Employee family not found" });
    }
    res.status(200).json({ message: "Success", data: employeeFamily });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// end: Get Employee Family by ID

// start: Update Employee Family
const updateEmployeeFamily = async (req, res) => {
  try {
    const employeeFamily = await EmployeeFamily.findByPk(req.params.id);
    if (!employeeFamily) {
      return res.status(404).json({ message: "Employee family not found" });
    }
    await employeeFamily.update(req.body.employeeFamilyData);
    res.status(200).json({
      message: "Employee family updated successfully",
      data: employeeFamily,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// end: Update Employee Family

// start: Delete Employee Family
const deleteEmployeeFamily = async (req, res) => {
  try {
    const employeeFamily = await EmployeeFamily.findByPk(req.params.id);
    if (!employeeFamily) {
      return res.status(404).json({ message: "Employee family not found" });
    }
    await employeeFamily.destroy();
    res.status(200).json({ message: "Employee family deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// end: Delete Employee Family

module.exports = {
  createEmployeeFamily,
  getAllEmployeeFamilies,
  getEmployeeFamilyById,
  updateEmployeeFamily,
  deleteEmployeeFamily,
};
