require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const userController = require("../controller/userController")
const app = express();
app.use(express.json());
app.use(userController);
module.exports = app;