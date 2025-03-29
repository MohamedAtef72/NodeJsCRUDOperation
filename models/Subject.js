const db = require("mongoose");

const Schema = db.Schema;

const subjectSchema = new db.Schema({
    _id:{
        type : Number,
        required : true
    },
    name:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    }
});

const Subject = db.model("Subject",subjectSchema);
module.exports = Subject;