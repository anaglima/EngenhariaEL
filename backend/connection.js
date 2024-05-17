const mysql = require("mysql");
require("dotenv").config();

var connection = mysql.createConnection({
  port: 4200,
  host: localhost,
  user: root,
  password: 120504,
  database: engenhariael,
});

connection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log(err);
  }
});

module.exports = connection;
