const db = require("../models/db.js");

//// retrieve data from education table
exports.select = (req,res) => {
    const sqlSelect = "select * from education;";
    db.query(sqlSelect,(err,result) => {
        console.log("fetched"+result);
        res.json(result);
    })
};

//// insert data into education table
exports.insert = (req,res) => {
    const degree = req.body.degree;
    const branch = req.body.branch;
    const specialization = req.body.specialization;
    const university = req.body.university;
    const dateFull = req.body.date;
    const marks = req.body.marks;

    const marksFloat = parseFloat(marks);
    const date = dateFull.toString().slice(0,10);

    console.log(req.body);
    console.log(date);

    const sqlInsert = "insert into education(degree,branch,specialization,university,date_of_acq,marks,userid) values(?,?,?,?,?,?,?); ";
    db.query(sqlInsert,[degree,branch,specialization,university,date,marksFloat,1],(err,result) => {
        console.log(err);
    }) 
};