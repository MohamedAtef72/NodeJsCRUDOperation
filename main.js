require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const DATA_BASE_CONNECTION = process.env.DATA_BASE_CONNECTION;

mongoose.connect(DATA_BASE_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(app.listen(3000,()=>console.log("Server Is Listining On Port 3000"))
).catch("Error In Connecting");

const studentRouter = require("./routes/students");
app.use('/student',studentRouter);

const subjectRouter = require("./routes/subject");
app.use("/subject",subjectRouter);

const studentsubjectRouter = require("./routes/studentsubject");
app.use('/studentsubject',studentsubjectRouter);

const accountRouter = require("./routes/account");
app.use("/account",accountRouter);