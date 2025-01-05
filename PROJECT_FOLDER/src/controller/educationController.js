const { Education, Employee } = require("../models");

const createEducation = async (req, res) => {
  try {
    const { educationData } = req.body;
    const employeeId = educationData.employee_id;
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      res.status(404).json({
        message: "Employee not found",
        data: employee,
      });
    }
    const education = await Education.create(educationData);
    res.status(201).json({
      message: "Success create education",
      data: education,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEducations = async (req, res) => {
  try {
    const educations = await Education.findAll();
    res.status(200).json({
      message: "Success get all education",
      total: educations.length,
      data: educations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEducationById = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.findByPk(id);
    if (!education)
      return res.status(404).json({ message: "Education not found" });
    res.status(200).json({
      message: "Success get education",
      data: education,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { educationData } = req.body;
    const [updated] = await Education.update(educationData, {
      where: { id },
    });
    if (!updated)
      return res.status(404).json({
        message: "Education not found",
        data: null,
      });
    const education = await Education.findByPk(id);
    res.status(200).json({
      message: "Education updated successfully",
      data: education,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Education.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ message: "Education not found" });
    res.status(200).json({ message: "Education deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEducation,
  getAllEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
};
