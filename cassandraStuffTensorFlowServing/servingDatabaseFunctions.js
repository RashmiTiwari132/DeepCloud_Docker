var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1:9042']});

module.exports = {
	addModel : function(modelID,description,modelPath,paper_link,tagsCommaSeparated,developer_username,callback) {
		tagsList = tagsCommaSeparated.split(',');
		var query = "INSERT INTO tensorServing.modelDetails (modelID,description,modelPath,paper_link,tags,published,developer_username) VALUES (?,?,?,?,?,?,?)";
		client.execute(query,[modelID,description,modelPath,paper_link,tagsList,false,developer_username],{ prepare: true}, function(err,result) {
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
	},

	addReview : function(modelID,reviewer_username,review,callback) {
		var query = "INSERT INTO tensorServing.modelReviews (modelID, reviewer_username, review, timestamp) VALUES (?,?,?,?)";
		client.execute(query,[modelID,reviewer_username,review,cassandra.types.timeuuid()], {prepare: true}, function(err,result) {
			callback(err,result);
		});
	},

	getReviews: function(modelID,callback) {
		var query = "SELECT * from tensorServing.modelReviews where modelID=?";
		client.execute(query,[modelID],{prepare : true},function(err,result) {
			callback(err,result);
		});
	}
}
