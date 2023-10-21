const express = require("express");
const VehicleType = require("../model/vehicleType");
const Vehicle = require("../model/vehicle");

const auth = require("../middlewaare/auth");

const vehicleController = express();
vehicleController.use(express.json());

vehicleController.get("/api/welcome", auth, (req,res)=>{
    res.status(200).json({message:"Welcome 🙌 "});
})
vehicleController.post("/api/vehicle/type", auth, async (req, res)=>{
    try{
        const {name, parking_charge} = req.body;
        if(!(name, parking_charge)){
            res.status(400).json({message: "Required all input"});
        }
        const user = req.user.user_id;

        await VehicleType.create({
            name, parking_charge, user_id:user
        }).then((err, vehicleType)=>{
            if(err){
                res.send(err);
            }else {
                res.status(200).json(vehicleType);
            }
        });
    }catch (err){

    }
})
vehicleController.get("/api/vehicle/type", auth, async (req, res)=>{
    try {
        await VehicleType.find({}).then((vehicleTypes) => {
            if (vehicleTypes) {
                console.log("Hello")
                const data = vehicleTypes.map(doc => ({name: doc.name, parking_charge: doc.parking_charge}))
                res.status(200).json({data});
            } else {
                console.log("Hello")
            }
        })
    }catch (error){
        console.log(error)
    }
})

vehicleController.post("/api/vehicle", auth, async (req,res)=>{
    try{
        const {vehicle_license_number, vehicle_owner_name, vehicle_owner_phone, vehicle_owner_address, entry_time, exit_time, parking_charge, vehicle_type_id} = req.body;
        if(!(vehicle_license_number, vehicle_owner_name, vehicle_owner_phone, vehicle_owner_address, entry_time, exit_time, parking_charge, vehicle_type_id)){
            res.status(400).json({message: "Required all input"});
        }
        const user = req.user.user_id;

        await Vehicle.create({
            vehicle_license_number, vehicle_owner_name, vehicle_owner_phone, vehicle_owner_address, entry_time, exit_time, parking_charge, vehicle_type_id, user_id:user
        }).then((vehicle)=>{
            if(vehicle){
                console.log("Helllo Vehilce")
                // res.send(err);
                res.status(200).json({data: vehicle});
            }else {
                console.log('No Data Added')
            }
        });
    }catch (err){

    }
})
vehicleController.get("/api/vehicle", auth, async (req, res)=>{
    try {
        await Vehicle.find({}).then((vehicles) => {
            if (vehicles) {
                console.log("Hello")
                // const data = vehicles.map(doc => ({vehicle_license_number: doc.vehicle_license_number, parking_charge: doc.parking_charge}))
                res.status(200).json({data:vehicles});
            } else {
                console.log("Hello")
            }
        })
    }catch (error){
        console.log(error)
    }
})

vehicleController.put("/api/vehicle/:vehicleID", auth, async (req, res)=>{
console.log(req.params.vehicleID)
    await Vehicle.findOneAndUpdate({_id: req.params.vehicleID},
        {
        $set: {
            vehicle_license_number: req.body.vehicle_license_number,
            vehicle_owner_name: req.body.vehicle_owner_name,
            vehicle_owner_phone: req.body.vehicle_owner_phone,
            vehicle_owner_address: req.body.vehicle_owner_address,
            entry_time: req.body.entry_time,
            exit_time: req.body.exit_time,
            parking_charge: req.body.parking_charge,
            vehicle_type_id: req.body.vehicle_type_id,
        },
    }, {new: true}).then((vehicle)=>{
        if(vehicle){
            res.status(200).json({data: vehicle});
        }else {
            console.log("HEllo", vehicle)
        }
    })
})
module.exports = vehicleController;