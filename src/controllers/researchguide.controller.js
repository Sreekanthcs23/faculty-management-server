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
    const sqlSelect = "select * from researchguide where userid="+req.user.userid+";";
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

    const name = req.body.name;
    const dateFull = req.body.date;
    const date = dateFull.toString().slice(4,15);
    const area = req.body.area;
    const topic = req.body.topic;
    const publication = req.body.publication;

    console.log(req.body);
    const certUrl = publicUrl.split(" ").join("%20");
    
    const sqlInsert = "insert into researchguide(name,resguid_date,area,topic,publication,certi_link,userid) values(?,?,?,?,?,?,?); ";
    db.query(sqlInsert,[name,date,area,topic,publication,certUrl,req.user.userid],(err,result) => {
        console.log(err);
    }) 
};

exports.delete = (req,res) => {
  const resid = req.body.resid;
  const sqlDelete = "delete from researchguide where idresearchguide = "+resid+";";
  db.query(sqlDelete,(err,result) => {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
  res.send("Deleted");
}