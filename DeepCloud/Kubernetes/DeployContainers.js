const http = require('http');
const exec = require('child_process').exec;

const runcommand_docker3 = "curl -k -H \"Content-Type: application/json\" -X POST -d @deployment_ubuntu.json http:\/\/s3-worker1.ece.ufl.edu\/apis\/extensions\/v1beta1\/namespaces\/default\/deployments\/";
const options_json = {
  "kind": "Pod",
  "apiVersion": "v1",
  "metadata": {
    "name": "nvidia-caffe-pod"
  },
  "spec": {
	"restartPolicy": "Never",
    "containers": [
      {
        "name": "nvidia-caffe-container",
        "image": "rashmitiwari1990/uf:nvidia_caffe_s3lab_v24",
		"command": ["python3", "newTest.py", "'{"width":"28","height":"28","nClass":"10","alpha":"0.01","File Name":"MNIST_data","modelID":"testID"}'"]
      }
    ]
  }
};

const options_jsonString = JSON.stringify(options_json);

var options_createpod = {
	host:'s3-worker1.ece.ufl.edu',
	path:'/api/v1/namespaces/default/pods/',
	method: 'POST',
	json: 'true',
	headers : {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(options_jsonString)
	}
};

var create_pod = function(userId){
	var req = http.request(options_createpod, function(res){
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
	path:'/api/v1/namespaces/default/pods/ubuntu',
	method: 'DELETE'
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

module.exports.create_pod = create_pod;
module.exports.delete_deployment = delete_deployment;