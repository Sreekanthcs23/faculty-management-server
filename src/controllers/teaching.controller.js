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
  console.log("user id in select:"+req.user.userid);
  const sqlSelect = "select * from teaching where userid="+req.user.userid+";";
  db.query(sqlSelect,(err,result) => {
      console.log("fetched"+result);
      res.json(result);
  })
};
var tutorialUrl;
var internalUrl;
var resultUrl;
var achievementUrl;
var feedbackUrl;
var attendanceUrl;
var timetableUrl;
var year;
var batch;
var branch;
var subcode;
var subname;
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
    year = req.body.year;
    batch = req.body.batch;
    branch = req.body.branch;
    subcode = req.body.subcode;
    subname = req.body.subname;

    console.log(req.body);
    tutorialUrl = publicUrl.split(" ").join("%20");
    res.json({ message: "Data1 inserted successfully." });
};

exports.insert2 = (req,res) => {

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
    console.log("Inserting internal pdf ");
    internalUrl = publicUrl.split(" ").join("%20");
    res.json({ message: "Data2 inserted successfully." });
} 

exports.insert3 = async (req,res) => {

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
    console.log("Inserting attendance pdf ");
   attendanceUrl = publicUrl.split(" ").join("%20");
   res.json({ message: "Data3 inserted successfully." });
}

exports.insert4 = (req,res) => {

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
    console.log("Inserting feedback pdf ");
    feedbackUrl = publicUrl.split(" ").join("%20");
    res.json({ message: "Data4 inserted successfully." });
} 

exports.insert5 = (req,res) => {

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
    console.log("Inserting timetable pdf ");
    timetableUrl = publicUrl.split(" ").join("%20");
    res.json({ message: "Data5 inserted successfully." });
} 

exports.insert6 = (req,res) => {

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
    console.log("Inserting result pdf ");
   resultUrl = publicUrl.split(" ").join("%20");
   res.json({ message: "Data6 inserted successfully." });
} 
exports.insert7 = (req,res) => {
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
    console.log(year,batch,branch);
    console.log("Inserting achievement pdf ");
    achievementUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "insert into teaching(year,batch,branch,subcode,subname,userid,tutorial,internal,attendance,feedback,timetable,result,achievement) values(?,?,?,?,?,?,?,?,?,?,?,?,?); ";
    db.query(sqlInsert,[year,batch,branch,subcode,subname,req.user.userid,tutorialUrl,internalUrl,attendanceUrl,feedbackUrl,timetableUrl,resultUrl,achievementUrl],(err,result) => {
        console.log(err);
    })
    res.json({ message: "final Data inserted successfully." }); 
}
exports.delete = (req,res) => {
  const teaid = req.body.teaid;
  console.log(teaid)
  const sqlDelete = "delete from teaching where tea_id = "+teaid+";";
  db.query(sqlDelete,(err,result) => {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
  res.send("Deleted");
} 