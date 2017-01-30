var express = require('express');
var routes = require('./routes');
var app = module.exports = express();
//var formidable = require('express-formidable');

app.use("/",routes);
//app.use(formidable());

var server = app.listen(6666,function () {
	console.log("database connector listening on port 6666!");
});

