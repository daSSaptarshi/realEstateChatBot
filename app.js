const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const CONFIG = require('./config');


const app = express();


// App medilwares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', require('./api'));
// app.get('/', function (req, res) {
//   res.sendFile(path.resolve(__dirname,  "client" ,"dist", "index.html"))
// });

app.use(express.static('client/dist'));
  
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "client" ,"dist", "index.html"));
  });

const port = CONFIG.PORT;

// Connect MongoDB
// MongoClient.connect('mongodb://127.0.0.1:27017/chatbotDB', function(err, db) {
//     if (err) throw err;
//     console.log('db connected')
//     db.close();
//   });


// const testFolder = './tests/';
const fs = require('fs');
var pathLong = "";
fs.readdirSync(__dirname+"/client").forEach(file => {
  pathLong = pathLong + " *** " +file
});

if(process.env.NODE_ENV === 'production')
{
  app.use(express.static(path.resolve(__dirname, "client", "dist")));
  
  app.get("/", (req, res) => {
    
    res.sendFile(path.resolve(__dirname,  "client" ,"dist", "index.html"));
  });
}

app.listen(port, () => console.log(`Hello world app listening on port ${pathLong}!`))