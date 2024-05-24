const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");

router.post("/add", auth.authenticateToken, checkRole.checkRole, (req, res) => {
  let material = req.body;
  var query =
    "insert into material (name,constructionId,description,supplier,quantity) values(?,?,?,?,?)";
  connection.query(
    query,
    [
      material.name,
      material.constructionId,
      material.description,
      material.supplier,
      material.quantity,
    ],
    (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ message: "Produto adicionado com sucesso!" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.get("/get", auth.authenticateToken, (req, res, next) => {
  var query =
    "select p.id,p.name,p.description,p.supplier,p.quantity,c.id as constructionId, c.name as constructionName from material as p INNER JOIN construction as c where p.constructionId = c.id";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get(
  "getByConstruction/:id",
  auth.authenticateToken,
  (req, res, next) => {
    const id = req.params.id;
    var query =
      "select id,name from material where constructionId = ? and status= 'true'";
    connection.query(query, [id], (err, results) => {
      if (!err) {
        return res.status(200).json(results);
      } else {
        return res.status(500).json(err);
      }
    });
  }
);
router.get("./getById/:id", auth.authenticateToken, (req, res, next) => {
  const id = req.params.id;
  var query = "select id,name,description,supplier from material where id = ?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results[0]);
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
    var query =
      "update material set name=?, constructionId=?, description=?, supplier=? where id=?";
    connection.query(
      query,
      [
        material.name,
        material.constructionId,
        material.description,
        material.supplier,
        material.id,
      ],
      (err, results) => {
        if (!err) {
          if (results.affectedRows == 0) {
            return res
              .status(404)
              .json({ message: "Id do material não encontrado." });
          }
          return res
            .status(200)
            .json({ message: "Material atualizado com sucesso!" });
        } else {
          return res.status(500).json(err);
        }
      }
    );
  }
);

router.delete(
  "/delete/:id",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    const id = req.params.id;
    var query = "delete from material where id=?";
    connection.query(query, [id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res
            .status(404)
            .json({ message: "Id do material não encontrado." });
        }
        return res
          .status(200)
          .json({ message: "Material deletado com sucesso!" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

router.patch(
  "/updateQuantity",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    let user = req.body;
    var query = "update material set quantity =? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res
            .status(404)
            .json({ message: "Id do material não encontrado." });
        }
        return res
          .status(200)
          .json({ message: "Quantidade do material atualizado com sucesso!" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

module.exports = router;
