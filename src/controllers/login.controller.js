const db = require("../models/db.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

//// retrieve data from education table
exports.getLogin = (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  };

//// insert data into education table
exports.postLogin = (req, res) => {
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
  };