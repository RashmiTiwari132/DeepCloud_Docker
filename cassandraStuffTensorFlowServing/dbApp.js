var express = require('express');
var routes = require('./routes');
var app = module.exports = express();
var cors = require('cors');
//var formidable = require('express-formidable');

app.use(cors({origin: true}));
app.use("/",routes);
//app.use(formidable());

var server = app.listen(7070,function () {
	console.log("database connector listening on port 7070!");
});

