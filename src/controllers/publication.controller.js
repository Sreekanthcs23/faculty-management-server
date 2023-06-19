const db = require("../models/db.js");

const { Storage } = require("@google-cloud/storage");

let projectId = "famous-sunbeam-382606"; // Get this from Google Cloud
let keyFilename = "keyfile.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("faculty_doc_bucket");

//// retrieve data from education table
exports.select = (req,res) => {
    console.log("user id in select:"+req.user.userid);
    const sqlSelect = "select * from publication where userid="+req.user.userid+";";
    db.query(sqlSelect,(err,result) => {
        console.log("fetched"+result);
        res.json(result);
    })
};

//// insert data into education table
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

    const type = req.body.type;
    const title = req.body.title;
    const name = req.body.name;
    const dateFull1 = req.body.startdate;
    const dateFull2 = req.body.enddate;
    const dateFull3 = req.body.date;
    const startdate = dateFull1.toString().slice(4,15);
    const enddate = dateFull2.toString().slice(4,15);
    const date = dateFull3.toString().slice(4,15);

    console.log(type);
    console.log(req.body);

    const certUrl = publicUrl.split(" ").join("%20");

    const sqlInsert = "insert into publication(publ_type,title,publ_name,sdate,edate,publ_date,certi_link,userid) values(?,?,?,?,?,?,?,?); ";
    console.log(sqlInsert);
    db.query(sqlInsert,[type,title,name,startdate,enddate,date,certUrl,req.user.userid],(err,result) => {
        console.log(err);
    }) 
};