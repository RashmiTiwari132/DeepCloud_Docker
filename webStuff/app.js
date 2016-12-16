var express = require('express');
var routes = require('./routes');
var app = module.exports = express();
var cors = require('cors');

process.env.NODE_ENV = 'est';


app.use(cors({origin: true}));

app.use('/', routes);

app.use("/S3LabUploads",express.static('S3LabUploads'));

var server = app.listen(8888, function () {
	console.log('App listening on port 8888!');
});

