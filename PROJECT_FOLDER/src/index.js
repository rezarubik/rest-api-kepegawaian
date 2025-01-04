const express = require("express");
const { sequelize } = require("./models");
require("dotenv").config();

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(express.json());

app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  console.log("Database connected!");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
