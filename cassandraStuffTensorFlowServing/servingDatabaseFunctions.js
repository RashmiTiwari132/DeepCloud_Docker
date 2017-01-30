var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1:9042']});

module.exports = {
	addModel : function(modelID,modelDesc,modelPath,callback) {
		var query = "INSERT INTO tensorServing.modelDetails (modelID,description,modelPath) VALUES (?,?,?)";
		client.execute(query,[modelID,modelDesc,modelPath],{ prepare: true}, function(err,result) {
			/*if(err!=null) {
				console.log("error in addModel : "+err);
			}*/
			callback(err,result);		
		});
	},

	getModel : function(modelID,callback) {
		var query = "SELECT * FROM tensorServing.modelDetails  WHERE modelID=?";
		client.execute(query,[modelID],{ prepare: true}, function(err,result) {
			/*if(err!=null) {
				console.log("error in addModel : "+err);
			}
			else {
				//console.log("addModel result : "+result);
				//console.log(result);
				//console.log("------");
				console.log(result.rows[0]);
			}*/
			callback(err,result);			
		});
	}
}