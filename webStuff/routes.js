var fs = require("fs");
var express = require('express');
var router = express.Router();
var formidable=require("formidable");
var path = require("path");
var uuid = require('node-uuid');

// Runs for all routes
router.use(function timeLog(req, res, next) {
	console.log("hi")
	next()
});



//Basic HTML Page renders
// 1. Home Page

router.get('/', function(request, response) {
	console.log("Homepage requested.")
	response.sendFile(__dirname + '/WebPages/index.html');
});

// API endpoints

// 1. Endpoint for training and testing on the MNIST dataset
router.post("/uploadCompleteScript",function (request,response) {
	console.log("Request handler 'uploadCompleteScript' was called.");

	//set response header
	response.setHeader('Content-Type', 'application/json');
	var form = new formidable.IncomingForm();
	//store extensions 
	form.keepExtensions = true;

	//set location and get file name
	var fileName = "";
	form.on('fileBegin', function(name, file) {
		console.log("*********** got file : "+file.name);
		file.path = path.join(__dirname,"/training_testing_script/",file.name);
		fileName = file.name.substring(0,file.name.indexOf("."));
	});

	form.parse(request,function(error,fields,files) {
		var job_id = uuid.v4();
		//store model path for sending later 
		var modelPath = "/training_testing_script/"+fileName+"_"+job_id+".ckpt";
		//input to docker module 
		var jsonSend = fields;
		jsonSend["File Name"]=fileName
		jsonSend["modelID"]=job_id
		data = JSON.stringify(jsonSend) 
		console.log("data to be sent to docker module is : "+data)	
		var x = require('./DockerBackendInterface.js') 
		x.deploy_application(data, function(output) {
			console.log("printing from deploy : "+output);
			response.end(output)
		});
	});
	
});


module.exports = router;
