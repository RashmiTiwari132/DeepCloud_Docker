//var containerStartCallback = require('./../callbacks/containerStartCallback.js');

var exec = require('child_process').exec;

var runcommand_docker3;
var userId_docker3;

var initiallizeuserid_docker3 = function(pUserId){
	userId_docker3 = pUserId;
}

var initiallizeRunCommand_docker3 = function(pUserId){
	
	var runcommand1 = "sudo docker run --name";
	var container_instance = "container_instance";
	var container_img = "rashmitiwari1990/uf:script";
	//var userId = pUserId;
	var userId = "";
	var space = " ";
        var exec = "python3 newTest.py '"+pUserId+"'";
	runcommand_docker3 = runcommand1+space+container_instance+userId+space+space+container_img+userId+" "+exec;
	//console.log("\n\n EXEC  "+exec+" \n\n"+pUserId);
}

var initiallize_docker3 = function(pUserId){
	
	initiallizeuserid_docker3(pUserId);
	initiallizeRunCommand_docker3(userId_docker3);
	console.log('Initiallized the command '+runcommand_docker3);
}

var run_container = function(){

	try{
		exec(runcommand_docker3, function(error, stdout, stderr){
			if(error != null){
				console.log(error);	
			}else{				//containerStartCallback.containerStartCallback(null, "20", stdout);
				console.log(stdout);
				//return stdout;
			}
		});
	}catch(error){
		//containerStartCallback.containerStartCallback(stderr, "20", null);
		return;
	}
}

var start = function(pUserId){
	initiallize_docker3(pUserId);
	console.log(run_container());
	console.log("UserId "+pUserId+" finished execution");
}

var start_container = function(pUserId){
	start(pUserId);
}

module.exports.start_container = start_container;


