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
    const sqlSelect = "select * from current_institution";
    db.query(sqlSelect,(err,result) => {
        console.log("fetched"+result);
        res.json(result);
    })
};

//// insert data into education table
exports.insert = (req,res) => {

  var publicUrls = [];

  try {
    for (let i = 0; i < 3; i++) {
      if (req.files[i]) {
        const blob = bucket.file(req.files[i].originalname);
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        
        const blobStream = blob.createWriteStream();
        
        blobStream.on("finish", () => {
          publicUrls.push(publicUrl);
          if (publicUrls.length === 3) {
            // Perform any additional actions once all files are uploaded
          }
        });
        
        blobStream.end(req.files[i].buffer);
      } else {
        throw `error with img ${i+1}`;
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
  
    const joiningdate1 = req.body.joiningdate;
    const joiningdesignation = req.body.joiningdesignation;
    const dateofproblemdeclaration1 = req.body.dateofproblemdeclaration;
    const promotiondate1 = req.body.promotiondate;
    const promotiondesignation = req.body.promotiondesignation;
    
    //const date = dateFull.toString().slice(0,10);
    const joiningdate = joiningdate1.toString().slice(4,15);
    const dateofproblemdeclaration = dateofproblemdeclaration1.toString().slice(4,15);
    const promotiondate = promotiondate1.toString().slice(4,15);
    console.log(req.body);
    //console.log(date);

    const appointmnetorderUrl = publicUrls[0].split(" ").join("%20");
    const problemdeclarationUrl = publicUrls[1].split(" ").join("%20");
    const promotionorderUrl = publicUrls[2].split(" ").join("%20");

    const sqlInsert = "insert into current_institution(userid,joining_date,joining_designation,date_of_problem_declaration,promotion_date,promotion_designation,appointment_order_link,problem_declaration_link,promotion_order_link) values(?,?,?,?,?,?,?,?,?) ; ";
    db.query(sqlInsert,[1,joiningdate,joiningdesignation,dateofproblemdeclaration,promotiondate,promotiondesignation,appointmnetorderUrl,problemdeclarationUrl,promotionorderUrl],(err,result) => {
        console.log(err);
    }) 
};


exports.select2 = (req,res) => {
  const sqlSelect = "select * from previous_experience";
  db.query(sqlSelect,(err,result) => {
      console.log("fetched"+result);
      res.json(result);
  })
};

//// insert data into previous_experience table
exports.insert2 = (req,res) => {

var publicUrls = [];

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
  const fromdate1 = req.body.fromdate;
  const todate1 = req.body.todate;
  const designation = req.body.designation;
  const institute = req.body.institute;
  
  //const date = dateFull.toString().slice(0,10);
  const fromdate = fromdate1.toString().slice(4,15);
  const todate = todate1.toString().slice(4,15);
  console.log(req.body);
  //console.log(date);

  const experiencecertificateUrl = publicUrl.split(" ").join("%20");

  const sqlInsert = "insert into previous_experience(userid,type,from_date,to_date,designation,institute,experience_certificate_link,) values(?,?,?,?,?,?,?) ; ";
  db.query(sqlInsert,[1,type,fromdate,todate,designation,institute,experiencecertificateUrl],(err,result) => {
      console.log(err);
  }) 
};