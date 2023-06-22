
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const educationRoute = require("./src/routes/education.routes");
const consultancyRoute = require("./src/routes/consultancy.routes");
const guidedprojectRoute = require("./src/routes/guidedproject.routes");
const professionalRoute = require("./src/routes/professional.routes");
const fundedprojectRoute = require("./src/routes/fundedproject.routes");
const teachingRoute = require("./src/routes/teaching.routes");
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
    res.send("You are authenticated congrats");
});
 
app.use("/education",educationRoute);
app.use("/consultancy",consultancyRoute);
app.use("/guidedproject",guidedprojectRoute);
app.use("/professional",professionalRoute);
app.use("/fundedproject",fundedprojectRoute);
app.use("/teaching",teachingRoute);

app.listen(3001,() => {
    console.log("server started on port 3001");
})
