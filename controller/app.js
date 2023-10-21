require("dotenv").config();
require("../config/database").connect();
const cors = require("cors");
const express = require("express");
const userController = require("../controller/userController")
const vehicleController = require("../controller/vehicleController");
const app = express();
app.use(express.json());
app.use(cors())
app.use(userController);
app.use(vehicleController)
module.exports = app;