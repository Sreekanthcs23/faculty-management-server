const db = require("../models/db.js");

const { Storage } = require("@google-cloud/storage");

let projectId = "famous-sunbeam-382606"; // Get this from Google Cloud
let keyFilename = "keyfile.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("faculty_doc_bucket");
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
    var publicUrl;  
    try {
        if (req.file) {
          console.log("File found, trying to upload...");
          const blob = bucket.file(req.file.originalname);
          publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          console.log(publicUrl);
          const blobStream = blob.createWriteStream();
    
          blobStream.on("finish", () => {
            console.log("Success");
          });
          blobStream.end(req.file.buffer);
        } else throw "error with img";
      } catch (error) {
        res.status(500).send(error);
    }
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