const db = require("../models/db.js");
const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

const controller = require('../controllers/professional.controller');
const express = require("express");

const router = express.Router();

router.get("/select1",(req,res) => {
  const sqlSelect = "select * from current_institution where userid = 2";
  db.query(sqlSelect,(err,result) => {
      console.log("fetched"+result);
      res.json(result);
  })
});

router.get("/select2",(req,res) => {
  const sqlSelect = "select * from previous_experience";
  db.query(sqlSelect,(err,result) => {
      console.log("fetched"+result);
      console.log(result[0].from_date);
      res.json(result);
  })
});

 // const upload = uploads({ dest: 'uploads/' }); 
  router.post("/insert1", multer.single("appointmentOrder"), (req,res) => {

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
      
      //const date = dateFull.toString().slice(0,10);
      const joiningDate = joiningDate1.toString().slice(4,15);
      const dateofProblemDeclaration = dateofProblemDeclaration1.toString().slice(4,15);
      const promotionDate = promotionDate1.toString().slice(4,15);
      console.log(req.body);
      //console.log(date);
  
      const appointmnetOrderUrl = publicUrl.split(" ").join("%20");
      //
      //const promotionorderUrl = publicUrls[2].split(" ").join("%20");
  
      const sqlInsert = "insert into current_institution(userid,joining_date,joining_designation,date_of_problem_declaration,promotion_date,promotion_designation,appointment_order_link) values(?,?,?,?,?,?,?); ";
      db.query(sqlInsert,[1,joiningDate,joiningDesignation,dateofProblemDeclaration,promotionDate,promotionDesignation,appointmnetOrderUrl],(err,result) => {
          console.log(err);
      }) 
  });

   router.post("/insert1Pdf2", multer.single("problemDeclaration"), (req,res) => {

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
      const sqlInsert = "insert into current_institution(problem_declaration_link) values(?); ";
      db.query(sqlInsert,[problemDeclarationUrl],(err,result) => {
          console.log(err);
      }) 
  });

  router.post("/insert1Pdf3", multer.single("promotionOrder"), (req,res) => {

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
      const sqlInsert = "insert into current_institution(promotion_order_link) values(?); ";
      db.query(sqlInsert,[promotionOrderUrl],(err,result) => {
          console.log(err);
      }) 
  } );

  router.post("/insert2", multer.single("experienceCertificate"),(req,res) => {

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
    
      console.log(experienceCertificateUrl);  

      const sqlInsert = "insert into previous_experience(userid,prof_type,from_date,to_date,designation,institute,experience_certificate_link) values(?,?,?,?,?,?,?); ";
      db.query(sqlInsert,[1,type,fromDate,toDate,designation,institute,experienceCertificateUrl],(err,result) => {
          console.log(err);
      }) 
    });
module.exports = router;