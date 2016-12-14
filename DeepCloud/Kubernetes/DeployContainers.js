const http = require('http');
const exec = require('child_process').exec;

const runcommand_docker3 = "curl -k -H \"Content-Type: application/json\" -X POST -d @deployment_ubuntu.json http:\/\/s3-worker1.ece.ufl.edu\/apis\/extensions\/v1beta1\/namespaces\/default\/deployments\/";
const options_json = {
	"kind": "Deployment",
	"apiVersion": "extensions\/v1beta1",
	        "metadata": {
                "name": "ubuntu"
        },
        "spec": {
                "replicas": 1,
                "template": {
                        "metadata":{
                                "labels":{
                                        "run": "ubuntu"
                                }
                        },
                        "spec": {
                                "containers": [{
                                        "name": "ubuntu",
                                        "image": "ubuntu:14.04",
                                        "ports":[{
                                                "containerPort": 80
                                        }]
                                }]
                        }
                }
        }
};

const options_jsonString = JSON.stringify(options_json);

var options_createDeployment = {
	host:'s3-worker1.ece.ufl.edu',
	path:'/apis/extensions/v1beta1/namespaces/default/deployments/',
	method: 'POST',
	json: 'true',
	headers : {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(options_jsonString)
	}
};

var create_deployment = function(userId){
	var req = http.request(options_createDeployment, function(res){
		console.log("create_deployment : response");
		res.setEncoding('utf8');
		res.on('data', function(chunk){
			console.log('Body '+JSON.stringify(chunk));
		});
	});

	req.write(options_jsonString);
	req.end();
};

var options_deleteDeployment = {
	host:'s3-worker1.ece.ufl.edu',
	path:'/apis/extensions/v1beta1/namespaces/default/deployments/ubuntu',
	method: 'POST',
	json: 'true',
	headers : {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(options_jsonString)
	}
};

var delete_deployment = function(userId){
	var req = http.request(options_deleteDeployment, function(res){
		console.log("delete_deployment: response");
		res.setEncoding('utf8');
		res.on('data', function(chunk){
			console.log('Body '+JSON.stringify(chunk));
		});
	});
	req.end();
};

module.exports.create_deployment = create_deployment;
module.exports.delete_deployment = delete_deployment;