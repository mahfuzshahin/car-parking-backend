const express = require("express");
const VehicleType = require("../model/vehicleType");
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

// vehicleController.post("/api/vehicle", auth, async (req, res)=>{
//     try{
//         const {name, parking_charge} = req.body;
//         if(!(name, parking_charge)){
//             res.status(400).json({message: "Required all input"});
//         }
//         const user = req.user.user_id;
//
//         await VehicleType.create({
//             name, parking_charge, user_id:user
//         }).then((err, vehicleType)=>{
//             if(err){
//                 res.send(err);
//             }else {
//                 res.status(200).json(vehicleType);
//             }
//         });
//     }catch (err){
//
//     }
// })

module.exports = vehicleController;