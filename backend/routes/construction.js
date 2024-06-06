const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");

router.post(
  "/add",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    let construction = req.body;
    query =
      "insert into construction(name, local, status, responsible) values(?, ?, ?, ?)";
    connection.query(
      query,
      [
        construction.name,
        construction.local,
        construction.status,
        construction.responsible,
      ],
      (err, results) => {
        if (!err) {
          return res
            .status(200)
            .json({ message: "Obra adicionada com sucesso!" });
        } else {
          return res.status(500).json(err);
        }
      }
    );
  }
);
router.get("/get", auth.authenticateToken, (req, res, next) => {
  var query = "select *from construction order by name";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.patch(
  "/update",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    let material = req.body;
    var query = "update construction set name=? where id=?";
    connection.query(query, [material.name, material.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res
            .status(404)
            .json({ message: "Id da obra não encontrada." });
        }
        return res.status(200).json({ message: "Obra atualizada com sucesso" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

module.exports = router;
