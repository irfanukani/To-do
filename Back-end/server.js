const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 1337;
const mysql = require("mysql");
const { default: axios } = require("axios");

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo",
});

con.connect(function (err) {
  if (err) throw err;
});

app.post("/", async (req, res) => {
  con.connect((err) => {
    if (err) console.log(err);
    console.log("Connected!");
    con.query(
      "INSERT INTO mytodos (id , task) VALUES (? , ?)",
      [req.body.id, req.body.task],
      function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        console.log(req.body.task);
        res.status(200).send("Done");
      }
    );
  });
});

app.put("/", (req, res) => {
  con.query(
    "UPDATE mytodos SET task = (?) WHERE ID=(?)",
    [req.body.updatedTask, req.body.id],
    (err, result) => {
      if (err) throw err;
      console.log(req.body.updatedTask);
      res.status(200).send("Done");
    }
  );
});

app.post("/delete", (req, res) => {
  con.query(
    "DELETE FROM mytodos WHERE ID=(?)",
    [req.body.deleteId],
    (err, result) => {
      if (err) throw err;
      res.status(200).send("Done");
      // console.log("delete  " + req.body.deleteId);
    }
  );
});

app.get("/", (req, res) => {
  con.query("SELECT * FROM mytodos", function (err, result) {
    if (err) throw err;
    // console.log("Result: " + result);
    res.status(200).send(result);
  });
});

app.listen(PORT, () => {
  console.log("server running at : http://localhost:" + PORT);
});
