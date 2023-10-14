require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const userController = require("../controller/userController")
const vehicleController = require("../controller/vehicleController");
const app = express();
app.use(express.json());
app.use(userController);
app.use(vehicleController)
module.exports = app;