require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 4000;
const app = express();

// todo: Running server
app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
