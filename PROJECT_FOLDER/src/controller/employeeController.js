const {
  Employee,
  EmployeeProfile,
  EmployeeFamily,
  Education,
} = require("../models");

/* ----------------------- // start: Get All Employee ----------------------- */
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
/* ----------------------- // end: Get All Employee ----------------------- */

// start: Get One Employee (with all relation to profile, family & education)
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
    res.json({
      message: "Success get employe",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// end: Get One Employee (with all relation to profile, family & education)

/* -------------------------------------------------------------------------- */
/*      // start: CRUD Employee with it's profile, family, and education      */
/* -------------------------------------------------------------------------- */
// todo: Create Employee with it's profile, family, and education
const createEmployee = async (req, res) => {
  const { employeeData, profileData, familiesData, educationsData } = req.body;

  const t = await Employee.sequelize.transaction();

  try {
    // todo: Create Employee
    const employee = await Employee.create(employeeData, { transaction: t });

    // todo: Create Profile
    if (profileData) {
      profileData.employee_id = employee.id;
      await EmployeeProfile.create(profileData, { transaction: t });
    }

    // todo: Create Families
    if (familiesData && familiesData.length) {
      const families = familiesData.map((family) => ({
        ...family,
        employee_id: employee.id,
      }));
      await EmployeeFamily.bulkCreate(families, { transaction: t });
    }

    // todo: Create Educations
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

// todo: Update Employee with it's profile, family, and education
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { employeeData, profileData, familiesData, educationsData } = req.body;

  const t = await Employee.sequelize.transaction();

  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // todo: Update Employee
    await employee.update(employeeData, { transaction: t });

    // todo: Update Profile
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

    // todo: Update Families
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

    // todo: Update Educations
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

// todo: Delete Employee with it's profile, family, and education
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  const t = await Employee.sequelize.transaction();

  try {
    // todo: Delete related data first
    await EmployeeProfile.destroy({
      where: { employee_id: id },
      transaction: t,
    });
    await EmployeeFamily.destroy({
      where: { employee_id: id },
      transaction: t,
    });
    await Education.destroy({ where: { employee_id: id }, transaction: t });

    // todo: Delete Employee
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
/* -------------------------------------------------------------------------- */
/*       // end: CRUD Employee with it's profile, family, and education       */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                      // start: CRUD in Employee Table                      */
/* -------------------------------------------------------------------------- */
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json({
      message: "Success Get All Employee",
      total: employees.length,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOneEmployee = async (req, res) => {
  try {
    const { employeeData } = req.body;
    const employee = await Employee.create(employeeData);
    res.status(201).json({
      message: "Success create employee",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOneEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeData } = req.body;
    const [updated] = await Employee.update(employeeData, { where: { id } });
    if (!updated)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOneEmployee = async (req, res) => {
  const t = await Employee.sequelize.transaction();
  try {
    const { id } = req.params;
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
    if (
      employee.profile !== null ||
      (employee.families.length = 0) ||
      (employee.educations.length = 0)
    ) {
      await t.rollback();
      res.status(200).json({
        message:
          "Oops sorry, you can not delete this employe because still have relation",
        data: employee,
      });
    } else {
      const deleted = await Employee.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: "Employee not found" });
      }
      await t.commit();
      res.status(200).json({ message: "Employee deleted successfully" });
    }
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};
/* -------------------------------------------------------------------------- */
/*                       // end: CRUD in Employee Table                       */
/* -------------------------------------------------------------------------- */

module.exports = {
  getAllEmployees, //note: With it's relation
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees, //note: Just employee
  createOneEmployee,
  updateOneEmployee,
  deleteOneEmployee,
};
