const db = require("../models/db.js");

//// retrieve data from consultancy table
exports.select = (req,res) => {
  console.log("user id in select:"+req.user.userid);
  const sqlSelect = "select * from consultancy where userid="+req.user.userid+";";
  db.query(sqlSelect,(err,result) => {
      console.log("fetched"+result);
      res.json(result);
  })
};

//// insert data into consultancy table
exports.insert = (req,res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;
    
    if(req.user.userid != 2) {
        res.json({message: "Not admin"});
    }

    else {
        console.log(req.body);
    
        const sqlInsert = "insert into user(username,password,type) values(?,?,?); ";
        db.query(sqlInsert,[username,password,type],(err,result) => {
            console.log(err);
        }) 
    }
    
};