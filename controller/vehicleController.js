const express = require("express");
const VehicleType = require("../model/vehicleType");
const auth = require("../middlewaare/auth");

const vehicleController = express();
vehicleController.use(express.json());

vehicleController.get("/api/welcome", auth, (req,res)=>{
    res.status(200).json({message:"Welcome 🙌 "});
})
vehicleController.post("/api/type", auth, async (req, res)=>{
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