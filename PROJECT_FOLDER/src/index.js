const express = require("express");
const { sequelize } = require("./models");
require("dotenv").config();

const employeeRoutes = require("./routes/employeeRoutes");
const educationRoutes = require("./routes/educationRoutes");
const employeeFamilyRoutes = require("./routes/employeeFamilyRoutes");
const employeeProfileRoutes = require("./routes/employeeProfileRoutes");

const app = express();
app.use(express.json());

// note: Employee
app.use("/api/employees", employeeRoutes);
// note: Education
app.use("/api/education", educationRoutes);
// note: Employee Family
app.use("/api/employee-families", employeeFamilyRoutes);
// note: Employee Profile
app.use("/api/employee-profile", employeeProfileRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  console.log("Database connected!");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
