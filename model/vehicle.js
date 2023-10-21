const mongoose = require("mongoose");

const vehicleSchema= new mongoose.Schema({
    vehicle_license_number: {type: String, default: null},
    vehicle_owner_name:  {type: String, default: null},
    vehicle_owner_phone:  {type: String, default: null},
    vehicle_owner_address:  {type: String, default: null},
    entry_time:  {type: String, default: null},
    exit_time:  {type: String, default: null},
    parking_charge:  {type: Number, default: null},
    vehicle_type_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'vehicleType'},
})
module.exports = mongoose.model('vehicle', vehicleSchema)
