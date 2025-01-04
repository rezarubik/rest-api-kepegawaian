const {
  Employee,
  EmployeeProfile,
  EmployeeFamily,
  Education,
} = require("../models");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        { model: EmployeeProfile, as: "profile" },
        { model: EmployeeFamily, as: "families" },
        { model: Education, as: "educations" },
      ],
    });
    res.json({
      message: "Success get Employees",
      total: employees.length,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id, {
      include: [
        { model: EmployeeProfile, as: "profile" },
        { model: EmployeeFamily, as: "families" },
        { model: Education, as: "educations" },
      ],
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEmployee = async (req, res) => {
  const { employeeData, profileData, familiesData, educationsData } = req.body;

  const t = await Employee.sequelize.transaction();

  try {
    // Create Employee
    const employee = await Employee.create(employeeData, { transaction: t });

    // Create Profile
    if (profileData) {
      profileData.employee_id = employee.id;
      await EmployeeProfile.create(profileData, { transaction: t });
    }

    // Create Families
    if (familiesData && familiesData.length) {
      const families = familiesData.map((family) => ({
        ...family,
        employee_id: employee.id,
      }));
      await EmployeeFamily.bulkCreate(families, { transaction: t });
    }

    // Create Educations
    if (educationsData && educationsData.length) {
      const educations = educationsData.map((education) => ({
        ...education,
        employee_id: employee.id,
      }));
      await Education.bulkCreate(educations, { transaction: t });
    }

    await t.commit();
    res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { employeeData, profileData, familiesData, educationsData } = req.body;

  const t = await Employee.sequelize.transaction();

  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update Employee
    await employee.update(employeeData, { transaction: t });

    // Update Profile
    if (profileData) {
      const profile = await EmployeeProfile.findOne({
        where: { employee_id: id },
      });
      if (profile) {
        await profile.update(profileData, { transaction: t });
      } else {
        profileData.employee_id = id;
        await EmployeeProfile.create(profileData, { transaction: t });
      }
    }

    // Update Families
    if (familiesData) {
      await EmployeeFamily.destroy({
        where: { employee_id: id },
        transaction: t,
      });
      const families = familiesData.map((family) => ({
        ...family,
        employee_id: id,
      }));
      await EmployeeFamily.bulkCreate(families, { transaction: t });
    }

    // Update Educations
    if (educationsData) {
      await Education.destroy({ where: { employee_id: id }, transaction: t });
      const educations = educationsData.map((education) => ({
        ...education,
        employee_id: id,
      }));
      await Education.bulkCreate(educations, { transaction: t });
    }

    await t.commit();
    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  const t = await Employee.sequelize.transaction();

  try {
    // Delete related data first
    await EmployeeProfile.destroy({
      where: { employee_id: id },
      transaction: t,
    });
    await EmployeeFamily.destroy({
      where: { employee_id: id },
      transaction: t,
    });
    await Education.destroy({ where: { employee_id: id }, transaction: t });

    // Delete Employee
    const employee = await Employee.destroy({ where: { id }, transaction: t });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await t.commit();
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
