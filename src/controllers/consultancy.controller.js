const db = require("../models/db.js");
const { Storage } = require("@google-cloud/storage");

let projectId = "famous-sunbeam-382606"; // Get this from Google Cloud
let keyFilename = "keyfile.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("faculty_doc_bucket");

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
    const agency = req.body.agency;
    const amount = req.body.amount;
    const year = req.body.year;
    
    console.log(req.body);
    const certUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "insert into consultancy(agency,amount,year,userid,certificate) values(?,?,?,?,?); ";
    db.query(sqlInsert,[agency,amount,year,req.user.userid,certUrl],(err,result) => {
        console.log(err);
    })
  };

    exports.delete = (req,res) => {
      const consid = req.body.consid;
      console.log(consid)
      const sqlDelete = "delete from consultancy where cons_id = "+consid+";";
      db.query(sqlDelete,(err,result) => {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
      });
      res.send("Deleted");
}