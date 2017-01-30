var express = require('express');
var router = express.Router();
var database = require('./servingDatabaseFunctions');
var formidable=require("formidable");


router.post("/addModel", function(req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req,function(error,fields,files) {
		database.addModel(fields.modelID,fields.modelDescription,fields.modelPath, function (err,result) {
			if(err!=null) {
				res.writeHead(400,{"Content-Type": "text/html"});
				res.write("adding model failed.");
				res.end();
			}
			else {
				res.writeHead(200,{"Content-Type": "text/html"});
				res.end("adding model successful.");
			}
		});
	});
});


router.post("/getModel", function(req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req,function(error,fields,files) {
		database.getModel(fields.modelID, function (err,result) {
			if(err!=null) {
				res.writeHead(400,{"Content-Type": "text/html"});
				res.write("Model with id : "+ fields.modelID+" not found.");
				res.end();
			}
			else {
				res.writeHead(200,{"Content-Type": "text/html"});
				//res.end(JSON);
				res.end(JSON.stringify(result.rows[0]));
			}
		});
	});
});



module.exports = router ; 

// 3a3b59d2-cfd0-4ab1-bce3-c64fce62f77d

// curl -F modelID="3a3b59d2-cfd0-4ab1-bce3-c64fce62f77d" -F modelDescription="testDescription" -F modelPath="/test/path" localhost:6666/addModel
// curl -F modelID="3a3b59d2-cfd0-4ab1-bce3-c64fce62f77d"  localhost:6666/getModel