const express = require('express');
const router = express.Router();
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const url = config.MONGO_URL;



router.post('/', (req, res) =>
{
  console.log(res.body)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(config.MONGO_DB);
        var myobj = {"name":"Saptarshi Das","contact_no":"1234567890","email":"saptsg.drgre@gmail.com","query":"weg rg reg"};
        // var queryCollection = dbo.get
        dbo.collection("query").insertOne(res.body, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
    res.send({message : 'ok'})
})

module.exports = router;