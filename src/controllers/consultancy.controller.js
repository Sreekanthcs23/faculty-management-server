const db = require("../models/db.js");

//// retrieve data from consultancy table
exports.select = (req,res) => {
    const sqlSelect = "select * from consultancy;";
    db.query(sqlSelect,(err,result) => {
        console.log("fetched"+result);
        res.json(result);
    })
};

//// insert data into consultancy table
exports.insert = (req,res) => {
    const agency = req.body.agency;
    const amount = req.body.amount;
    const year = req.body.year;
    
    console.log(req.body);
    console.log(date);

    const sqlInsert = "insert into consultancy(agency,amount,year,userid) values(?,?,?,?); ";
    db.query(sqlInsert,[agency,amount,year,1],(err,result) => {
        console.log(err);
    }) 
};