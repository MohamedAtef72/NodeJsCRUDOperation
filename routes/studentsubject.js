const express = require('express');
const router = express.Router();
const StudentSubject = require('../models/StudentSubject');

// Add student to subject
router.post('/addStudentSubject', async (req, res) => {
  try {
    const newEnrollment = new StudentSubject(
      { _id : req.body._id,
        studentId : req.body.studentId,
        subjectId : req.body.subjectId
      });
    await newEnrollment.save();
    res.status(201).send(newEnrollment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all subjects for a student
router.get('/student/:studentId', async (req, res) => {
  try {
    const subjects = await StudentSubject.find({ studentId: req.params.studentId }).populate('subjectId');
    res.status(200).send(subjects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all students for a subject
router.get('/subject/:subjectId', async (req, res) => {
  try {
    const students = await StudentSubject.find({ subjectId: req.params.subjectId }).populate('studentId');
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Remove student from subject
router.delete('/:id', async (req, res) => {
  try {
    await StudentSubject.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Enrollment removed' });
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;