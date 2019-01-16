'use strict';

var express = require('express');
var mongoose = require('mongoose');

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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.post("/api/shorturl/new", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/shorturl/:id", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});