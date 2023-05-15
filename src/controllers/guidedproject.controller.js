const db = require("../models/db.js");

//// retrieve data from guidedproject table
exports.select = (req,res) => {
    const sqlSelect = "select * from guidedproject;";
    db.query(sqlSelect,(err,result) => {
        console.log("fetched"+result);
        res.json(result);
    })
};

//// insert data into guidedproject table
exports.insert = (req,res) => {
    const sname = req.body.sname;
    const pname = req.body.pname;
    const batch = req.body.batch;
    const publication = req.body.publication;
    
    console.log(req.body);
    console.log(date);

    const sqlInsert = "insert into guidedproject(sname,pname,batch,publication,userid) values(?,?,?,?,?); ";
    db.query(sqlInsert,[sname,pname,batch,publication,1],(err,result) => {
        console.log(err);
    }) 
};