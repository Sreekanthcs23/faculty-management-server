const db = require("../models/db.js");

const { Storage } = require("@google-cloud/storage");

let projectId = "famous-sunbeam-382606"; // Get this from Google Cloud
let keyFilename = "keyfile.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("faculty_doc_bucket");

//// retrieve data from guidedproject table
exports.select = (req,res) => {
    const sqlSelect = "select * from guidedproject where userid="+req.user.userid+";";
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
    console.log(sname);
    console.log(req.body);
    console.log("inside");
    const sqlInsert = "insert into guidedproject(sname,pname,batch,publication,userid) values(?,?,?,?,?); ";
    db.query(sqlInsert,[sname,pname,batch,publication,req.user.userid],(err,result) => {
        console.log(err);
    }) 
};
exports.delete = (req,res) => {
    const guidid = req.body.guidid;
    console.log(guidid)
    const sqlDelete = "delete from guidedproject where guid_id = "+guidid+";";
    db.query(sqlDelete,(err,result) => {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
    res.send("Deleted");
}