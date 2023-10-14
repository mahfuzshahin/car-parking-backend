const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    first_name: {type: String, default: null},
})
