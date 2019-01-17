'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
require('dotenv').config()
const dns = require('dns');

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
 }).then(() => {
  console.log('MongoDB connected.')
}).catch(err => console.log(err))  

require('./Schema')
const Url = mongoose.model('Url')

var cors = require('cors');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});


app.post("/api/shorturl/new", (req, res) => {
    const obj = {original_url: req.body.url}
    new Url(obj)
    .save()
    .then(url => {
      res.json({
        original_url: url.original_url,
        short_url: url._id
      })
    })
})

app.get("/api/shorturl/:id", (req, res) => {
  Url
  .findOne({_id: req.params.id})
  .then(url => {
    res.redirect(url.original_url)
  })
});

const listener = app.listen(3002, () => {
  console.log('Node.js listening on port ' + listener.address().port);
});