const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
 
const db = mysql.createPool({
  host: '104.197.133.232',
  user: 'root',
  password: 'AthleticAnalytics',
  database: 'trackData'
});
app.get("/Searchbar", (req, res) => {
  const getOutput = "SELECT DISTINCT College FROM di UNION SELECT DISTINCT College FROM dii UNION SELECT DISTINCT College FROM diii"
  db.query(getOutput, (err, result) => {
    res.send(result);
  });
}); 
app.get("/SchoolProfile", (req, res) => {
  const getOutput = "SELECT DISTINCT College FROM dii"
  db.query(getOutput, (err, result) => {
    res.send(result);
  });
});

app.get("/IndivRankings", (req, res) => {
  const query = req.query.query;
  db.query(query, (err, result) => {
    if (err) {
      console.log("Query " + query);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/SquadRankings/Colleges", (req, res) => {
  const query = req.query.query;
  db.query(query, (err, result) => {
    if (err) {
      console.log("Query " + query);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
}); 

app.get("/SquadRankings/TopResults", (req, res) => {
  const query = req.query.query;
  db.query(query, (err, result) => {
    if (err) {
      console.log("Query " + query);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/", (req, res)=> {
  res.send([]);
});
app.listen(3001, () => {
    console.log("Yay, your server is running on port 3001");
});