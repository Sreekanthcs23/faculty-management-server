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
exports.select1 = (req,res) => {
    const sqlSelect = "select * from current_institution";
    db.query(sqlSelect,(err,result) => {
        console.log("fetched"+result);
        res.json(result);
    })
};

//// insert data into current institute with appointment order table
exports.insert1 = (req,res) => {

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
  
    const joiningDate1 = req.body.joiningDate;
    const joiningDesignation = req.body.joiningDesignation;
    const dateofProblemDeclaration1 = req.body.dateofProblemDeclaration;
    const promotionDate1 = req.body.promotionDate;
    const promotionDesignation = req.body.promotionDesignation;

    const joiningDate = joiningDate1.toString().slice(4,15);
    const dateofProblemDeclaration = dateofProblemDeclaration1.toString().slice(4,15);
    const promotionDate = promotionDate1.toString().slice(4,15);
    console.log(req.body);

    const appointmentOrderUrl = publicUrl.split(" ").join("%20");

    const sqlInsert = "insert into current_institution(userid,joining_date,joining_designation,date_of_problem_declaration,promotion_date,promotion_designation,appointment_order_link) values(?,?,?,?,?,?,?); ";
    db.query(sqlInsert,[2,joiningDate,joiningDesignation,dateofProblemDeclaration,promotionDate,promotionDesignation,appointmentOrderUrl],(err,result) => {
        console.log(err);
    }) 
};

//uploading problem declaration to current institute table
exports.insert1Pdf2 = (req,res) => {

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
    const problemDeclarationUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "insert into current_institution(problem_declaration_link) values(?) where userid = 2; ";
    db.query(sqlInsert,[problemDeclarationUrl],(err,result) => {
        console.log(err);
    }) 
} 

//uploading promotion order to current institute table
exports.insert1Pdf3 = (req,res) => {

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
    const promotionOrderUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "insert into current_institution(promotion_order_link) values(?) where useid = 2; ";
    db.query(sqlInsert,[promotionOrderUrl],(err,result) => {
        console.log(err);
    }) 
} 

//Previous experience

exports.select2 = (req,res) => {
  const sqlSelect = "select * from previous_experience";
  db.query(sqlSelect,(err,result) => {
      console.log("fetched"+result);
      res.json(result);
  })
};

// insert data into previous_experience table
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

  const type = req.body.type;
  const fromDate1 = req.body.fromDate;
  const toDate1 = req.body.toDate;
  const designation = req.body.designation;
  const institute = req.body.institute;
  
  //const date = dateFull.toString().slice(0,10);
  const fromDate = fromDate1.toString().slice(4,15);
  const toDate = toDate1.toString().slice(4,15);
  console.log(req.body);
  //console.log(date);

  const experienceCertificateUrl = publicUrl.split(" ").join("%20");

  const sqlInsert = "insert into previous_experience(userid,prof_type,from_date,to_date,designation,institute,experience_certificate_link) values(?,?,?,?,?,?,?); ";
  db.query(sqlInsert,[1,type,fromDate,toDate,designation,institute,experienceCertificateUrl],(err,result) => {
      console.log(err);
  }) 
};