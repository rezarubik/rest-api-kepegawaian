const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Employee = require("./employee")(sequelize, DataTypes);
const Education = require("./education")(sequelize, DataTypes);
const EmployeeFamily = require("./employeeFamily")(sequelize, DataTypes);
const EmployeeProfile = require("./employeeProfile")(sequelize, DataTypes);

Employee.hasOne(EmployeeProfile, { foreignKey: "employee_id", as: "profile" });
Employee.hasMany(EmployeeFamily, { foreignKey: "employee_id", as: "families" });
Employee.hasMany(Education, { foreignKey: "employee_id", as: "educations" });

EmployeeProfile.belongsTo(Employee, { foreignKey: "employee_id" });
EmployeeFamily.belongsTo(Employee, { foreignKey: "employee_id" });
Education.belongsTo(Employee, { foreignKey: "employee_id" });

module.exports = {
  sequelize,
  Employee,
  Education,
  EmployeeFamily,
  EmployeeProfile,
};
