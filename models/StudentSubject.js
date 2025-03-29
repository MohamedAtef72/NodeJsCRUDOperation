const db = require("mongoose");
const Schema = db.Schema;
const StudentSubjectSchema = db.Schema(
    {
        _id:{
            type:Number,
            required:true
        },
        studentId:{
            type:Number,
            required:true
        },
        subjectId:{
            type:Number,
            required:true
        }
    }
);
const StudentSubject = db.model("studentsubject",StudentSubjectSchema);
module.exports = StudentSubject;