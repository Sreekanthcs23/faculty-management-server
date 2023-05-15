const db = require("../models/db.js");

//// retrieve data from teaching table
exports.select = (req,res) => {
    const sqlSelect = "select * from teaching;";
    db.query(sqlSelect,(err,result) => {
        console.log("fetched"+result);
        res.json(result);
    })
};

//// insert data into teaching table
exports.insert = (req,res) => {
    const year = req.body.year;
    const batch = req.body.batch;
    const branch = req.body.branch;
    const subcode = req.body.subcode;
    const subname = req.body.subname;

    console.log(req.body);
    console.log(date);

    const sqlInsert = "insert into teaching(year,batch,branch,subcode,subname,userid) values(?,?,?,?,?,?); ";
    db.query(sqlInsert,[year,batch,branch,subcode,subname,1],(err,result) => {
        console.log(err);
    }) 
};