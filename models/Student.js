const db = require("mongoose");

const Schema = db.Schema;

const studentSchema = db.Schema(
    {
        _id:{
            type : Number,
            required : true
        },
        email:{
            type:String,
            required:true
        },
        password : {
            type:String,
            required:true
        },
        name:{
            type : String,
            required : true
        },
        age:{
            type : Number,
            required : true
        }
    });
    
const Student = db.model("Student",studentSchema);
module.exports = Student;