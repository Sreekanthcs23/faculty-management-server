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
    const sqlSelect = "select * from education;";
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

    const degree = req.body.degree;
    const branch = req.body.branch;
    const specialization = req.body.specialization;
    const university = req.body.university;
    const dateFull = req.body.date;
    const marks = req.body.marks;

    const marksFloat = parseFloat(marks);
    const date = dateFull.toString().slice(4,15);

    console.log(req.body);
    console.log(dateFull);

    const certUrl = publicUrl.split(" ").join("%20");

    const sqlInsert = "insert into education(degree,branch,specialization,university,date_of_acq,marks,userid,certificate_link) values(?,?,?,?,?,?,?,?); ";
    db.query(sqlInsert,[degree,branch,specialization,university,date,marksFloat,1,certUrl],(err,result) => {
        console.log(err);
    }) 
};