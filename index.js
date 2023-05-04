const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

require('dotenv').config();

const db = mysql.createPool({
    host:"34.135.63.190",
    user:"root",
    password:process.env.GCP_PASSWD,
    database:"facultydb"
}); 

const app = express();

app.use(express.json());
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
      },
    })
  );


  app.get("/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });
  
  app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("inside login");
    db.query(
      "SELECT * FROM user WHERE username = ?;",
      username,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
  
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {

                const id = result[0].userid;
                const user = {userid:id};
                console.log("id in login:"+user.userid);
                const token = jwt.sign(user,"jwtsecret", {
                    expiresIn: 300,
                });
                console.log("logged in");
                req.session.user = result;
                res.json({ auth: true, token: token, result: result});
            } else {
              res.json({auth:false,message: "wrong username / password"});
              console.log("wrong password");
            }
          });
        } else {
          res.json({auth:false,message: "no user exists"});
        }
      }
    );
  });

const verifyJWT = (req,res,next) => {
    const token = req.headers["x-access-token"];
    console.log("token:"+token);
    if(!token) {
        res.send("Yo we need a token, please give it to us next time!");
    }else {
        jwt.verify(token,"jwtsecret",(err,user) => {
            if(err) {
                res.json({auth:false,message:"U failed to authenticate"});
            }else {
                req.user = user;
                console.log("userid:"+user.userid);
                next();
            }
        });
    }
} 

app.get("/isUserAuth",verifyJWT,(req,res)=> {
    res.send("Yo u are authenticated congrats");
});
 
app.get('/education/select',(req,res) => {
    const sqlSelect = "select * from education;";
    db.query(sqlSelect,(err,result) => {
        console.log("fetched"+result);
        res.json(result);
    })
})

app.post('/education/insert',(req,res) => {
    const degree = req.body.degree;
    const branch = req.body.branch;
    const specialization = req.body.specialization;
    const university = req.body.university;
    const dateFull = req.body.date;
    const marks = req.body.marks;

    const marksFloat = parseFloat(marks);
    const date = dateFull.toString().slice(0,10);

    console.log(req.body);
    console.log(date);

    const sqlInsert = "insert into education(degree,branch,specialization,university,date_of_acq,marks,userid) values(?,?,?,?,?,?,?); ";
    db.query(sqlInsert,[degree,branch,specialization,university,date,marksFloat,1],(err,result) => {
        console.log(err);
    }) 
});

app.get('/fundedproject/select',(req,res) => {
    const sqlSelect = "select * from fundedProject;";
    db.query(sqlSelect,(err,result) => {
        console.log("fetched"+result);
        res.json(result);
    })
});

app.post('/fundedproject/insert',(req,res) => {
    const name = req.body.name;
    const agency = req.body.agency;
    const amount = req.body.amount;
    const period = req.body.period;
    const dateFull = req.body.date;
    const status = req.body.status;

    const date = dateFull.toString().slice(0,10);
    const sqlInsert = "insert into fundedProject(name,agency,amount,period,date_of_san,status,userid) values(?,?,?,?,?,?,?);";
    db.query(sqlInsert,[name,agency,amount,period,date,status,1],(err,result) => {
        console.log(err);
    })
});


app.listen(3001,() => {
    console.log("server started on port 3001");
})
