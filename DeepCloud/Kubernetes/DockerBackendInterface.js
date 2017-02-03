var ODeployContainers = require(__dirname+"/DeployContainers.js");
var OExecuteContainer = require(__dirname+"/ExecuteContainer.js");

module.exports = {
	deploy_application : function(userId) {
		ODeployContainers.create_pod(userId);
		//OExecuteContainer.start_container(userId);
	}
}


