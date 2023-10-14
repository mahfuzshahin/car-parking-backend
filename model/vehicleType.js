const mongoose = require("mongoose");

const vehicleTypeSchema = new mongoose.Schema({
    name: {type: String, default: null},
    parking_charge: {type: Number, default: null},
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
})
module.exports = mongoose.model("vehicleType", vehicleTypeSchema);