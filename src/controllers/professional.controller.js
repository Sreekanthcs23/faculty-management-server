const db = require("../models/db.js");

//// retrieve data from education table
exports.select = (req,res) => {
    const sqlSelect = "select * from current_institution";
    db.query(sqlSelect,(err,result) => {
        console.log("fetched"+result);
        res.json(result);
    })
};

//// insert data into education table
exports.insert = (req,res) => {
    const joiningdate = req.body.joining_date;
    const joiningdesignation = req.body.joiningdesignation;
    const dateofproblemdeclaration = req.body.dateofproblemdeclaration;
    const promotiondate = req.body.promotiondate;
    const promotiondesignation = req.body.promotiondesignation;
    
    const date = dateFull.toString().slice(0,10);

    console.log(req.body);
    console.log(date);

    const sqlInsert = "insert into current_profession(userid,joining_date,joining_designation,date_of_problem_declaration,promotion_date,promotion_designation) values(?,?,?,?,?,?,) ; ";
    db.query(sqlInsert,[1,joiningdate,joiningdesignation,dateofproblemdeclaration,promotiondate,promotiondesignation,1],(err,result) => {
        console.log(err);
    }) 
};