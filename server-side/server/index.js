//import Indranking from '../../client-side/src/pages/Indranking';

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
  database: 'diii'
});
//POSSIBLE QUERY OPTION FOR OTHER PAGES
/*function getQueries(string) {
  const conferenceNames = string;
}*/
app.get("/DivisionIII", (req, res) => {
  const getOutput = "SELECT * FROM AARTFC ORDER BY Event_ID, AARTFC.Rank LIMIT 10"
  db.query(getOutput, (err, result) => {
    res.send(result);
  });
}); 

app.get("/DivisionII", (req, res) => {
  const getOutput = "SELECT * FROM AARTFC LIMIT 2"
  db.query(getOutput, (err, result) => {
    res.send(result);
  });
}); 
app.get("/DivisionI", (req, res) => {
  const getOutput = "SELECT * FROM AARTFC LIMIT 1"
  db.query(getOutput, (err, result) => {
    res.send(result);
  });
}); 
app.get("/", (req, res)=> {
  res.send([]);
});
app.listen(3001, () => {
    console.log("Yay, your server is running on port 3001");
});