const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const cors = require('cors');


const app = express();
app.use(express.json());

app.use (cors())
//create connection to database
const db = mysql.createPool({
    host: process.env.DB_HOST, //localhost
    user: process.env.DB_USER, //root
    password: process.env.DB_PASSWORD, //password
    database: process.env.DB, //ravenbooks
  });

  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
})

app.get("/livre", (req, res) => {
    db.query("SELECT * FROM livre", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.post("/livre", (req, res) => {
    const insertQuery = "INSERT INTO livre SET ?";
    db.query(insertQuery, req.body, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Review Added to Database");
      }
    });
  });

  app.put("/livre", (req, res) => {
    const updateQuery =
      "UPDATE livre SET book_title = ?, book_review = ?, book_rating = ? WHERE id = ?";
    db.query(
      updateQuery,
      [req.body.book_title,req.body.book_review, req.body.book_rating, req.body.id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  app.delete("/livre/:id", (req, res) => {
    db.query(
      "DELETE FROM livre WHERE id = ?",
      req.params.id,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });