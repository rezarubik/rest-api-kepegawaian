const { EmployeeProfile, Employee } = require("../models");

// Create Employee Profile
const createEmployeeProfile = async (req, res) => {
  const { employeeProfileData } = req.body;
  const t = await Employee.sequelize.transaction();
  try {
    const employee = await Employee.findByPk(employeeProfileData.employee_id);
    if (!employee) {
      await t.rollback();
      res.status(404).json({
        message: "Employee not found",
        data: employee,
      });
      return;
    }

    const existingProfile = await EmployeeProfile.findByPk(
      employeeProfileData.employee_id,
      {
        include: [{ model: Employee, as: "Employee" }],
      }
    );
    // todo: Check employee has been the profile
    if (existingProfile) {
      await t.rollback();
      res.status(400).json({
        message: `Employee already has a profile`,
        data: existingProfile,
      });
      return;
    }

    await t.commit();
    const employeeProfile = await EmployeeProfile.create(employeeProfileData);
    res.status(201).json({
      message: "Employee profile created successfully",
      data: employeeProfile,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

// Get All Employee Profiles
const getAllEmployeeProfiles = async (req, res) => {
  try {
    const employeeProfiles = await EmployeeProfile.findAll();
    res.status(200).json({
      message: "Success Get All Employee Profiles",
      total: employeeProfiles.length,
      data: employeeProfiles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Employee Profile by ID
const getEmployeeProfileById = async (req, res) => {
  try {
    const employeeProfile = await EmployeeProfile.findByPk(req.params.id);
    if (!employeeProfile) {
      return res.status(404).json({ message: "Employee profile not found" });
    }
    res.status(200).json({ message: "Success", data: employeeProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Employee Profile
const updateEmployeeProfile = async (req, res) => {
  try {
    const employeeProfile = await EmployeeProfile.findByPk(req.params.id);
    if (!employeeProfile) {
      return res.status(404).json({ message: "Employee profile not found" });
    }
    await employeeProfile.update(req.body.employeeProfileData);
    res.status(200).json({
      message: "Employee profile updated successfully",
      data: employeeProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Employee Profile
const deleteEmployeeProfile = async (req, res) => {
  try {
    const employeeProfile = await EmployeeProfile.findByPk(req.params.id);
    if (!employeeProfile) {
      return res.status(404).json({ message: "Employee profile not found" });
    }
    await employeeProfile.destroy();
    res.status(200).json({ message: "Employee profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEmployeeProfile,
  getAllEmployeeProfiles,
  getEmployeeProfileById,
  updateEmployeeProfile,
  deleteEmployeeProfile,
};
