const express = require("express");
const router = express.Router()
const authenticationToken = require("../middlewares/authentication");
const Subject = require("../models/Subject");
const {removeSubjectEnrollments} = require("../repos/studentsubjectRepo");

// Subject CRUD Operation
router.get("/getAll",authenticationToken,async(req,res)=>{
    try{
    const Subjects = await Subject.find()
    res.status(200).json(Subjects);
    }
    catch(e){
        req.status(500).send("Failed to Get Data",e.message);
    }
});
router.post("/addSubject",async(req,res)=>{
    try{
    const subject = new Subject({
        _id:req.body.Id,
        name:req.body.Name,
        description:req.body.Description 
    });
    await subject.save();
    res.status(200).send("Subject added Successfully");
    }
    catch(e){
        res.status(500).send("Subject Failed added",e.message)
    }
});
router.put("/updateSubject/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updated = req.body;
      // Find and update the subject
      const updateSubject = await Subject.findById(id);
      if (!updateSubject) {
        return res.status(404).send("Failed to update: Subject not found");
      }
      updateSubject.name = updated.Name;
      updateSubject.description = updated.Description;
      await updateSubject.save();
      res.status(200).send({ message: "Successfully Updated", subject: updateSubject });
    } catch (error) {
      res.status(500).send({ message: "Failed to update", error: error.message });
    }
  }
);
router.delete("/deleteSubject/:id", async (req, res) => {
    try {
      const id = req.params.id;
      // Find and delete the subject
      const deleteSubject = await Subject.findByIdAndDelete(id);
      if (!deleteSubject) {
        return res.status(404).send("Failed to delete: Subject not found");
      }
      await removeSubjectEnrollments(id);
      res.status(200).send({ message: "Subject Deleted Successfully", subject: deleteSubject });
    } catch (error) {
      res.status(500).send({ message: "Failed to delete", error: error.message });
    }
  }
);

module.exports = router;