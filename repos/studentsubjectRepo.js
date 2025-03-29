const StudentSubject = require("../models/StudentSubject");
// Remove all enrollments for a student
async function removeStudentEnrollments(studentId) {
    await StudentSubject.deleteMany({ studentId });
  }
  
  // Remove all enrollments for a subject
  async function removeSubjectEnrollments(subjectId) {
    await StudentSubject.deleteMany({ subjectId });
  }

module.exports = {
    removeStudentEnrollments,
    removeSubjectEnrollments
};  