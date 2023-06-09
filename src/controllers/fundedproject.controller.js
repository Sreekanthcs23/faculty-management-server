const db = require("../models/db.js");

const { Storage } = require("@google-cloud/storage");

let projectId = "famous-sunbeam-382606"; // Get this from Google Cloud
let keyFilename = "keyfile.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("faculty_doc_bucket");

//// retrieve data from fundedproject table
exports.select = (req,res) => {
  console.log("user id in select:"+req.user.userid);
  const sqlSelect = "select * from fundedproject where userid="+req.user.userid+";";
  db.query(sqlSelect,(err,result) => {
      console.log("fetched"+result);
      res.json(result);
  })
};

//// insert data into fundedproject table
exports.insert = (req,res) => {
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
    const agency = req.body.agency;
    const amount = req.body.amount;
    const period = req.body.period;
    const dateFull = req.body.date;
    const status = req.body.status;

    const date = dateFull.toString().slice(4,15);

    console.log(req.body);
    console.log(dateFull);
    const certUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "insert into fundedproject(name,agency,amount,period,date,status,userid,letter) values(?,?,?,?,?,?,?,?); ";
    db.query(sqlInsert,[name,agency,amount,period,date,status,req.user.userid,certUrl],(err,result) => {
        console.log(err);
    }) 
};

exports.delete = (req,res) => {
  const fundid = req.body.fundid;
  console.log(fundid)
  const sqlDelete = "delete from fundedproject where fund_id = "+fundid+";";
  db.query(sqlDelete,(err,result) => {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
  res.send("Deleted");
}