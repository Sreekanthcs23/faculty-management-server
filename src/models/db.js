const mysql = require("mysql");

console.log("hello"+process.env.GCP_PASSWD);
const connection = mysql.createPool({
    host:"34.135.63.190",
    user:"root",
    password:process.env.GCP_PASSWD,
    database:"facultydb"
}); 

module.exports = connection;