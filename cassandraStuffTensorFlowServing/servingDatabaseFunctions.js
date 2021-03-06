var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1:9042']});

module.exports = {
	addModel : function(modelID,description,modelPath,paper_link,tagsCommaSeparated,developer_username,category,citations,callback) {
		tagsList = tagsCommaSeparated.split(',');
		var query = "INSERT INTO tensorServing.modelDetails (modelID,description,modelPath,paper_link,tags,published,developer_username,category,citations) VALUES (?,?,?,?,?,?,?,?,?)";
		client.execute(query,[modelID,description,modelPath,paper_link,tagsList,false,developer_username,category,citations],{ prepare: true}, function(err,result) {
			/*if(err!=null) {
				console.log("error in addModel : "+err);
			}*/
			callback(err,result);		
		});
	},

	getModelByID : function(modelID,callback) {
		console.log("getModelByID called.");
		var query = "SELECT * FROM tensorServing.modelDetails  WHERE modelID=?";
		client.execute(query,[modelID],{ prepare: true}, function(err,result) {
			callback(err,result);			
		});
	},

	getModelByCategory : function(category,callback) {
		console.log("getModelByCategory called.");
		var query = "SELECT * FROM tensorServing.modelDetails  WHERE category=? ALLOW FILTERING";
		client.execute(query,[category],{ prepare: true}, function(err,result) {
			callback(err,result);			
		});
	},

	getAllModels : function(callback) 
	{
		console.log("getAllModels called.");
		var query = "SELECT * FROM tensorServing.modelDetails";
		client.execute(query,[],{ prepare: true}, function(err,result) {
			callback(err,result);			
		});
	},


	addReview : function(modelID,reviewer_username,review,rating,callback) {
		var query = "INSERT INTO tensorServing.modelReviews (modelID, reviewer_username, review, rating, timestamp) VALUES (?,?,?,?,?)";
		client.execute(query,[modelID,reviewer_username,review,rating,cassandra.types.timeuuid()], {prepare: true}, function(err,result) {
			callback(err,result);
		});
	},

	getReviews: function(modelID,callback) {
		var query = "SELECT * from tensorServing.modelReviews where modelID=?";
		client.execute(query,[modelID],{prepare : true},function(err,result) {
			callback(err,result);
		});
	},

	getModelRating: function(modelID,callback) {
		var query = "SELECT AVG(rating) from tensorServing.modelReviews where modelID=?";
		client.execute(query,[modelID],{prepare : true},function(err,result) {
			callback(err,result);
		});
	}

}
