require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
// register method
router.post("/register",async(req,res)=>{
    try{
        const student = new Student({
          _id:req.body.Id,
          email:req.body.Email,
          name:req.body.Name,
          password:req.body.Password,
          age:req.body.Age,
        });
        await student.save();
        res.status(200).send("Student added Successfully");      
      }catch(error){
          res.status(500).send({message: "Failed to AddStudent",error : error.message});
        }  
      }
);
// login method
router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const userFromDb = await Student.findOne({email : email});
    if(!userFromDb){res.status(401).send("Email or Password Are Not Correct")};
    const checkPassword = userFromDb.password === password;
    if(!checkPassword){res.status(401).send("Email or Password Are Not Correct")};
    const user = {email:email,password:password};
    const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    res.json({token : token});
});

module.exports = router;