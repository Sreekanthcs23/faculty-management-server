require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const educationRoute = require("./src/routes/education.routes");
const loginRoute = require("./src/routes/login.routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");



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


app.use("/login",loginRoute);

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
 
app.use("/education",educationRoute);

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
