var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index.js');
var auth = require('./auth.js')();
var app = module.exports = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.initialize()); 

app.use('/',routes);

var server = app.listen(5000,function() {
   console.log('App listening on port 5000.'); 
});
