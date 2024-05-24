const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../services/authentication");

router.get("/details", auth.authenticateToken, (req, res, next) => {
  var constructionCount;
  var materialCount;
  //var billCount;
  var query = "select count(id) as constructionCount from construction";
  connection.query(query, (err, results) => {
    if (!err) {
      constructionCount = results[0].constructionCount;
    } else {
      return res.status(500).json(err);
    }
  });
  var query = "select count(id) as materialCount from material";
  connection.query(query, (err, results) => {
    if (!err) {
      materialCount = results[0].materialCount;
    } else {
      return res.status(500).json(err);
    }
  });

  /*var query = "select count(id) as billCount from bill";
  connection.query(query, (err, results) => {
    if (!err) {
      billCount = results[0].billCount;
      var data = {
        category: categoryCount,
        product: productCount,
        bill: billCount,
      };
      return res.status(200).json(data);
    } else {
      return res.status(500).json(err);
    }
  });*/
});

module.exports = router;
