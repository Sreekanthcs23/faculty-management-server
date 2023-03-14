const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
    host:"facultydb.cslwxjjcqksg.ap-southeast-2.rds.amazonaws.com",
    user:"admin",
    password:"Sree23awsrds",
    database:"facultydb"
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/education/data',(req,res) => {
    const sqlSelect = "select * from faculty.education;";
    db.query(sqlSelect,(err,result) => {
        console.log(result);
        res.send(result);
    })
})

app.post('/education',(req,res) => {
    const degree = req.body.degree;
    const branch = req.body.branch;
    const specialization = req.body.specialization;
    const university = req.body.university;
    const date = req.body.date;
    const marks = req.body.marks;
    const marksFloat = parseFloat(marks);

    const sqlInsert = "insert into faculty.education(userid,degree,branch,specialization,university,dateofacq,marks) values(?,?,?,?,?,?,?); ";
    db.query(sqlInsert,[1,degree,branch,specialization,university,date,marksFloat],(err,result) => {
        console.log(err);
    })
});


app.listen(3001,() => {
    console.log("server started on port 3001");
})
