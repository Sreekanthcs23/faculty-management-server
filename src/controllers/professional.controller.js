const db = require("../models/db.js");
const { Storage } = require("@google-cloud/storage");

let projectId = "famous-sunbeam-382606"; // Get this from Google Cloud
let keyFilename = "keyfile.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("faculty_doc_bucket");

// retrieve data current institution table
exports.select1 = (req,res) => {
    const sqlSelect = "select * from current_institution  where userid = " + req.user.userid + " ;" ;
    db.query(sqlSelect,(err,result) => {
        console.log("fetched"+result);
        res.json(result);
    })
};

// insert data into current institute with appointment order table
exports.insert1 = (req,res) => {

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
    console.log("Inserting first pdf and details");
    const joiningDate1 = req.body.joiningDate;
    const joiningDesignation = req.body.joiningDesignation;
    const dateofProbationDeclaration1 = req.body.dateofProbationDeclaration;
    const promotionDate1 = req.body.promotionDate;
    const promotionDesignation = req.body.promotionDesignation;

    const joiningDate = joiningDate1.toString().slice(4,15);
    const dateofProbationDeclaration = dateofProbationDeclaration1.toString().slice(4,15);
    const promotionDate = promotionDate1.toString().slice(4,15);
    console.log(req.body);
    console.log("inserting details and appointmentOrderUrl");
    const appointmentOrderUrl = publicUrl.split(" ").join("%20");
    //const sqlCount = "select count * from current_institution where userid = "+  req.user.userid  + " ;";
    /*let count; 
     db.query(sqlSelect,(err,result) => {
      console.log("fetched"+result);
      count = result[0].count;
    })
    if(count == 0){
      const sqlInsert = "insert into current_institution(joining_date, joining_designation, date_of_problem_declaration, promotion_date, promotion_designation, appointment_order_link, userid) values(?, ?, ?, ?, ?, ?, ?)  where userid = " +  req.user.userid  + " ;";
    }
    */
      const sqlInsert = "update current_institution set joining_date = ?, joining_designation = ?, date_of_problem_declaration = ?, promotion_date = ?, promotion_designation = ?, appointment_order_link = ?   where userid = " +  req.user.userid  + " ;";  
      db.query(sqlInsert,[joiningDate,joiningDesignation,dateofProbationDeclaration,promotionDate,promotionDesignation,appointmentOrderUrl],(err,result) => {
        console.log(err);
    }) 
};

//uploading probation declaration to current institute table
exports.insert1Pdf2 = (req,res) => {

  var publicUrl = '';  
    try {
        if (req.file) {
          console.log("File found(pdf2), trying to upload...");
          const blob = bucket.file(req.file.originalname);
          publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          console.log(publicUrl);
          const blobStream = blob.createWriteStream();
    
          blobStream.on("finish", () => {
            console.log("Success");
          });
          blobStream.end(req.file.buffer);
          console.log("Inserting second pdf ");
          const probationDeclarationUrl = publicUrl.split(" ").join("%20");
          const sqlInsert = "update current_institution set probation_declaration_link = ? where userid = " + req.user.userid + " ;";
          db.query(sqlInsert,[probationDeclarationUrl],(err,result) => {
              console.log(err);
    }) 
        } else throw "error with img";
      } catch (error) {
        res.status(500).send(error);
    }
    
} 

//uploading promotion order to current institute table
exports.insert1Pdf3 = (req,res) => {

  var publicUrl = '';  
    try { 
        if (req.file) {
          console.log("File found(pdf3), trying to upload...");
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
    console.log("Inserting third pdf ");
    const promotionOrderUrl = publicUrl.split(" ").join("%20");
    const sqlInsert = "update current_institution set promotion_order_link = ? where userid = " + req.user.userid + " ;";
    db.query(sqlInsert,[promotionOrderUrl],(err,result) => {
        console.log(err);
    }) 
} 

//Previous experience

exports.select2 = (req,res) => {
  const sqlSelect = "select * from previous_experience where userid = " + req.user.userid + " ;";
  db.query(sqlSelect,(err,result) => {
      console.log("fetched"+result);
      res.json(result);
  })
};

// insert data into previous_experience table
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
    console.log("Inserting previous experience details");
  const type = req.body.type;
  const fromDate1 = req.body.fromDate;
  const toDate1 = req.body.toDate;
  const designation = req.body.designation;
  const institute = req.body.institute;
  
  //const date = dateFull.toString().slice(0,10);
  const fromDate = fromDate1.toString().slice(4,15);
  const toDate = toDate1.toString().slice(4,15);
  console.log(req.body);
  console.log("Inside insert 2 controller");

  const experienceCertificateUrl = publicUrl.split(" ").join("%20");
  console.log(experienceCertificateUrl);

  /*const sqlInsert = "insert into previous_experience(userid, prof_type, from_date, to_date ,designation ,institute, experience_certificate_link) values(?,?,?,?,?,?,?); ";
  db.query(sqlInsert,[1, type, fromDate, toDate, designation, institute, experienceCertificateUrl],(err,result) => {
      console.log(err);
  })*/
  const sqlInsert = "INSERT INTO previous_experience (userid, prof_type, from_date, to_date, designation, institute, experience_certificate_link) VALUES (?,?,?,?,?,?,?);";
db.query(sqlInsert, [ req.user.userid , type, fromDate, toDate, designation, institute, experienceCertificateUrl], (err, result) => {
  console.log(err);
});
 
};
exports.delete = (req,res) => {
  const profid = req.body.profid;
  const sqlDelete = "delete from previous_experience where prev_exp_id = "+profid+";";
  db.query(sqlDelete,(err,result) => {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
  res.send("Deleted");
}