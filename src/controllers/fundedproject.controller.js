const db = require("../models/db.js");

//// retrieve data from fundedproject table
exports.select = (req,res) => {
    const sqlSelect = "select * from fundedproject;";
    db.query(sqlSelect,(err,result) => {
        console.log("fetched"+result);
        res.json(result);
    })
};

//// insert data into fundedproject table
exports.insert = (req,res) => {
    const name = req.body.name;
    const agency = req.body.agency;
    const amount = req.body.amount;
    const period = req.body.period;
    const dateFull = req.body.date;
    const status = req.body.status;

    const date = dateFull.toString().slice(0,10);

    console.log(req.body);
    console.log(date);

    const sqlInsert = "insert into fundedproject(name,agency,amount,period,date,status,userid) values(?,?,?,?,?,?,?); ";
    db.query(sqlInsert,[name,agency,amount,period,date,status,1],(err,result) => {
        console.log(err);
    }) 
};