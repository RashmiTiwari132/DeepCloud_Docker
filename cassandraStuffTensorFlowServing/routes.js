var express = require('express');
var router = express.Router();
var database = require('./servingDatabaseFunctions');
var formidable=require("formidable");


router.post("/addModel", function(req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req,function(error,fields,files) {
		database.addModel(fields.modelID,fields.description,fields.modelPath,fields.paper_link,fields.tags,fields.developer_username,fields.category,fields.citations, function (err,result) {
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


router.get("/getModel", function(req,res) {
	if(req.query.category!=null) {
		database.getModelByCategory(req.query.category, function(err,result) {
			if(err!=null) {
				res.writeHead(400,{"Content-Type": "text/html"});
				res.write("Fetching models failed : "+err+"\n");
				res.end();
			}
			else {
				res.writeHead(200,{"Content-Type": "text/html"});
				//res.end(JSON);
				res.end(JSON.stringify(result.rows[0]));
			}

		});
	}
	else if(req.query.modelID!=null){
		database.getModelByID(req.query.modelID, function (err,result) {
			if(err!=null) {
				res.writeHead(400,{"Content-Type": "text/html"});
				res.write("Model with id : "+ req.query.modelID+" not found.");
				res.end();
			}
			else {
				res.writeHead(200,{"Content-Type": "text/html"});
				//res.end(JSON);
				res.end(JSON.stringify(result.rows));
			}
		});
	}
	else {
		database.getAllModels(function(err,result) {
			res.status(200).send(JSON.stringify(result.rows));
		});	
	}
});

router.post("/addReview",function(req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req,function(error,fields,files) {
		database.addReview(fields.modelID,fields.reviewer_username,fields.review,fields.rating,function(err,result) {
	//		console.log("callbacl");
			if(err!=null) {
				res.writeHead(400,{"Content-Type": "text/html"});
				res.write("Adding review failed : "+err);
				res.end();
			}
			else {
				res.writeHead(200,{"Content-Type": "text/html"});
				//res.end(JSON);
				res.end("Review added.");
			}
		});
	});
});

router.get("/getReviews",function(req,res) {
	database.getReviews(req.query.modelID,function(err,result) {
		if(err!=null) {
				res.writeHead(400,{"Content-Type": "text/html"});
				res.write("Fetching reviews failed : "+err);
				res.end();
		}
		else {
			res.writeHead(200,{"Content-Type": "text/html"});
			//res.end(JSON);
			res.end(JSON.stringify(result.rows));
		}
	});
});

router.get("/getModelRating",function(req,res) {
	database.getModelRating(req.query.modelID,function(err,result) {
		if(err!=null) {
				res.writeHead(400,{"Content-Type": "text/html"});
				res.write("Fetching model rating failed : "+err);
				res.end();
		}
		else {
			res.writeHead(200,{"Content-Type": "text/html"});
			//res.end(JSON);
			res.end(JSON.stringify(result.rows));
		}
	});
});

router.get("/getCategories",function(req,res) {
	categories = ['Vision','Gamebot','Natural Langauge','Genomics']
	res.status(200).send(JSON.stringify(categories));	
});


module.exports = router ; 

// 3a3b59d2-cfd0-4ab1-bce3-c64fce62f77d

// curl -F modelID="3a3b59d2-cfd0-4ab1-bce3-c64fce62f77d" -F modelDescription="testDescription" -F modelPath="/test/path" localhost:6666/addModel
// curl -F modelID="3a3b59d2-cfd0-4ab1-bce3-c64fce62f77d"  localhost:6666/getModel
