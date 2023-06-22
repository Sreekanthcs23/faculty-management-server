const mysql = require("mysql");

console.log("hello"+process.env.GCP_PASSWD);
const connection = mysql.createPool({
    host:"localhost",
    user:"root",
    password:process.env.GCP_PASSWD,
    database:"faculty"
}); 

module.exports = connection;