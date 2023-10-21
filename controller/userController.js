const express = require("express");
const User = require('../model/user');
const auth = require("../middlewaare/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userController = express();
userController.use(express.json());

userController.post("/api/register", async (req,res)=>{
    try {
        const {first_name, last_name, email, password} = req.body;
        if(!(email && password && first_name && last_name)){
            res.status(400).json({message: "All input is required"})
        }
        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.status(409).json({message: "User Already Exist. Please Login"})
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        const token = jwt.sign(
            { user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token = token;
        res.status(201).json(user._id);
    }catch (err){
        console.log(err)
    }
});
userController.post("/api/login", async (req, res)=>{
    try{
        const {email, password} = req.body;
        if(!(email && password)){
            res.status(400).json({message: "All input is required"})
        }
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                    }
                );
            user.token = token;
            res.status(200).json(user);
        }else {
            res.status(400).json({message: "Invalid Credentials"})
        }
    }catch (err) {
        console.log(err)
    }
})
userController.get("/api/profile", auth, async (req, res)=>{
    const user = req.user.user_id;
    const logged_user = await User.findById(user);
    const first_name = logged_user.first_name;
    const last_name = logged_user.last_name;
    res.json({data: {
            first_name: first_name,
            last_name: last_name,
            email: logged_user.email,
        }});
})
module.exports = userController;