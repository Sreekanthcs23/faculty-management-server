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
    const tutorialUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "insert into teaching(year,batch,branch,subcode,subname,userid,tutorial) values(?,?,?,?,?,?,?); ";
    db.query(sqlInsert,[year,batch,branch,subcode,subname,req.user.userid,tutorialUrl],(err,result) => {
        console.log(err);
    }) 
};

exports.insert2 = (req,res) => {

  var publicUrl = '';  
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
    const internalUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "update teaching set internal = ? where userid = "+req.user.userid+";";
    db.query(sqlInsert,[internalUrl],(err,result) => {
        console.log(err);
    }) 
} 

exports.insert3 = (req,res) => {

  var publicUrl = '';  
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
    const attendanceUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "update teaching set attendance = ? where userid ="+ req.user.userid+";";
    db.query(sqlInsert,[attendanceUrl],(err,result) => {
        console.log(err);
    }) 
}

exports.insert4 = (req,res) => {

  var publicUrl = '';  
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
    const feedbackUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "update teaching set feedback = ? where userid = "+ req.user.userid+";";
    db.query(sqlInsert,[feedbackUrl],(err,result) => {
        console.log(err);
    }) 
} 

exports.insert5 = (req,res) => {

  var publicUrl = '';  
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
    const timetableUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "update teaching set timetable = ? where userid ="+ req.user.userid+";";
    db.query(sqlInsert,[timetableUrl],(err,result) => {
        console.log(err);
    }) 
} 

exports.insert6 = (req,res) => {

  var publicUrl = '';  
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
    const resultUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "update teaching set result = ? where userid = "+ req.user.userid+";";
    db.query(sqlInsert,[resultUrl],(err,result) => {
        console.log(err);
    }) 
} 
exports.insert7 = (req,res) => {

  var publicUrl = '';  
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
    console.log("Inserting achievement pdf ");
    const achievementUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "update teaching set achievement = ? where userid = "+ req.user.userid+";";
    db.query(sqlInsert,[achievementUrl],(err,result) => {
        console.log(err);
    }) 
} 