var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1:9042']});

module.exports = {
	addModel : function(modelID,description,modelPath,paper_link,tagsCommaSeparated,developer_username,callback) {
		tagsList = tagsCommaSeparated.split(',');
		var query = "INSERT INTO tensorServing.modelDetails (modelID,description,modelPath,paper_link,tags,published,developer_username) VALUES (?,?,?,?,?,?,?)";
		client.execute(query,[modelID,modelDesc,modelPath,paper_link,tagsList,false,developer_username],{ prepare: true}, function(err,result) {
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

	addReview : function(modelID,review,timestamp,reviewer_username,callback) {
		//check first if review present for that model, if yes append to existing reviews list using "UPDATE"
		//else "INSERT"
		var testPresenceQuery = "SELECT COUNT(*) FROM tensorServing.modelDetails WHERE modelID=?";
		client.execute(testPresenceQuery,[modelID],{prepare: true},function(err,result) {
			if(result.rows[0].count>0) {
				//UPDATE

			}
			else {
				//INSERT
				var query = "INSERT INTO tensorServing.modelReviews (modelID,reviews,timestamps,reviewer_usernames) VALUES (?,?,?,?)";
				client.execute(query,[modelID,[review],[timestamp],[reviewer_username]], {prepare: true}, function(err,result) {
					callback(err,result);
				});
			}
		});
	}
}