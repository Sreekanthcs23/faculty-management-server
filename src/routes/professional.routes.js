const db = require("../models/db.js");
const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

const { Storage } = require("@google-cloud/storage");

const verifyJWT = require("../controllers/login.controller").verifyJWT;

let projectId = "famous-sunbeam-382606"; // Get this from Google Cloud
let keyFilename = "keyfile.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("faculty_doc_bucket");

const controller = require('../controllers/professional.controller');
const express = require("express");

const router = express.Router();
router.get("/select1",verifyJWT,controller.select1);

router.get("/select2",verifyJWT,controller.select2);

 // const upload = uploads({ dest: 'uploads/' }); 
//router.post("/insert1",verifyJWT, multer.single("appointmentOrder"),controller.insert1);
router.post("/insert1", verifyJWT, multer.single("appointmentOrder"), (req,res) => {

  var publicUrl1 = '';  
    try {
        if (req.file) {
          console.log("File found, trying to upload...");
          const blob = bucket.file(req.file.originalname);
          publicUrl1 = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          console.log(publicUrl1);
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

    const appointmentOrderUrl = publicUrl1.split(" ").join("%20");

    const sqlUpdate = "UPDATE current_institution SET joining_date = ?, joining_designation = ?, date_of_problem_declaration = ?, promotion_date = ?, promotion_designation = ?, appointment_order_link = ? WHERE userid = "+req.user.userid+";";
    db.query(sqlUpdate, [joiningDate, joiningDesignation, dateofProblemDeclaration, promotionDate, promotionDesignation, appointmentOrderUrl ], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("appointmentOrderUrl updated successfully.");
    }
    });

});
 // router.post("/insert1Pdf2",verifyJWT, multer.single("probationDeclaration"),controller.insert1Pdf2); 
 router.post("/insert1Pdf2", verifyJWT, multer.single("probationDeclaration"), (req,res) => {

  var publicUrl2 = '';  
    try {
        if (req.file) {
          console.log("File found, trying to upload...");
          const blob = bucket.file(req.file.originalname);
          publicUrl2 = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          console.log(publicUrl2);
          const blobStream = blob.createWriteStream();
    
          blobStream.on("finish", () => {
            console.log("Success");
          });
          blobStream.end(req.file.buffer);
        } else throw "error with img";
      } catch (error) {
        res.status(500).send(error);
    }
    const probationDeclarationUrl = publicUrl2.split(" ").join("%20");
    const sqlUpdate = "UPDATE current_institution SET probation_declaration_link = ? WHERE userid = "+req.user.userid+";";
    db.query(sqlUpdate, [probationDeclarationUrl], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("probationDeclarationUrl updated successfully.");
      }
    });

});
//router.post("/insert1Pdf3",verifyJWT, multer.single("promotionOrder"),controller.insert1Pdf3); 
router.post("/insert1Pdf3", verifyJWT, multer.single("promotionOrder"), (req,res) => {

  var publicUrl3 = '';  
    try {
        if (req.file) {
          console.log("File found, trying to upload...");
          const blob = bucket.file(req.file.originalname);
          publicUrl3 = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          console.log(publicUrl3);
          const blobStream = blob.createWriteStream();
    
          blobStream.on("finish", () => {
            console.log("Success");
          });
          blobStream.end(req.file.buffer);
        } else throw "error with img";
      } catch (error) {
        res.status(500).send(error);
    }
    const promotionOrderUrl = publicUrl3.split(" ").join("%20");
    const sqlUpdate = "UPDATE current_institution SET promotion_order_link = ? WHERE userid = "+req.user.userid+";";
    db.query(sqlUpdate, [promotionOrderUrl], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("promotionOrderUrl updated successfully.");
      }
    });
    
} );
//router.post("/insert2",verifyJWT, multer.single("experienceCertificate"),controller.insert2);  
router.post("/insert2", verifyJWT, multer.single("experienceCertificate"),(req,res) => {

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
  
    const type = req.body.type;
    const fromDate1 = req.body.fromDate;
    const toDate1 = req.body.toDate;
    const designation = req.body.designation;
    const institute = req.body.institute;
    
    const fromDate = fromDate1.toString().slice(4,15);
    const toDate = toDate1.toString().slice(4,15);
    console.log(req.body);

    console.log(publicUrl);

    const experienceCertificateUrl = publicUrl.split(" ").join("%20");
    console.log("Inside insert 2 router");
    console.log(experienceCertificateUrl);  

    const sqlInsert = "insert into previous_experience(userid, prof_type, from_date, to_date, designation, institute, experience_certificate_link) values(?,?,?,?,?,?,?); ";
    db.query(sqlInsert,[req.user.userid, type, fromDate, toDate, designation, institute, experienceCertificateUrl],(err,result) => {
        console.log(err);
    }) 
  });
router.post("/delete",verifyJWT,controller.delete);
module.exports = router;