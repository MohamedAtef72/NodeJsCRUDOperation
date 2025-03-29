const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const {removeStudentEnrollments} = require("../repos/studentsubjectRepo");

// Student CRUD Operation
router.get("/getAll",async(req,res)=>{
    try{
    const studentList = await Student.find();
    res.status(200).json(studentList);
    }catch(error){
      res.status(500).send({message: "Failed to GetStudents",error : error.message});
    }
  }
);

router.put("/updateStudent/:id",async(req,res)=>{
  try{
    const studentId = req.params.id;
    const studentFromRequest = req.body;
    const studentFromDb =await Student.findById(studentId);
    if(!studentFromDb){
      return res.status(404).send("Failed to update: Subject not found");
    }
    studentFromDb.email = studentFromRequest.Email;
    studentFromDb.name = studentFromRequest.Name;
    studentFromDb.password = studentFromRequest.Password;
    studentFromDb.age = studentFromRequest.Age;
    await studentFromDb.save();
    res.status(200).send("Student updated Successfully");      
  }catch(error){
      res.status(500).send({message: "Failed to update Student",error : error.message});
    }  
  }
);  

router.delete("/deleteStudent/:id",async(req,res)=>{
  try{
    const studentId = req.params.id;
    const studentFromDb =await Student.findByIdAndDelete(studentId);
    if(!studentFromDb){
      return res.status(404).send("Failed to delete: Subject not found");
    }
    await removeStudentEnrollments(studentId);
    res.status(200).send("Student deleted Successfully");      
  }catch(error){
      res.status(500).send({message: "Failed to delete Student",error : error.message});
    }  
  }
); 

module.exports = router;