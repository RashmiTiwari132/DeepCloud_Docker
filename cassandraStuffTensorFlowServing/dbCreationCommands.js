CREATE KEYSPACE IF NOT EXISTS tensorServing WITH REPLICATION = { 'class': 'SimpleStrategy','replication_factor': 1 };

CREATE TABLE IF NOT EXISTS tensorServing.modelDetails (modelID UUID, description text, modelPath text, PRIMARY KEY(modelID));



CREATE TABLE IF NOT EXISTS tensorServing.modelDetails (modelID UUID, description text, modelPath text, PRIMARY KEY(modelID), );


--------------


ALTER TABLE tensorServing.modelDetails ADD (overall_rating int, developer_id text); 

ALTER TABLE tensorServing.modelDetails ADD (developer_name text, model_name text, tags list<text>, citations_count int); 

ALTER TABLE tensorServing.modelDetails ADD published boolean;

ALTER TABLE tensorServing.modelDetails ADD paper_link text;

-------------

CREATE TABLE IF NOT EXISTS tensorServing.modelReviews (modelID UUID, user_name text, modelPat text, PRIMARY KEY(modelID));

------------------- 

NEW table from scratch
 
CREATE TABLE IF NOT EXISTS tensorServing.modelDetails (modelID UUID, description text, modelPath text, paper_link text, tags list<text>, published boolean
, developer_username text, PRIMARY KEY(modelID));


CREATE TABLE IF NOT EXISTS tensorServing.modelReviews(modelID UUID, reviews list<text>, timestamps list<timestamp>, reviewer_usernames list<text>, PRIMARY KEY(modelID));

https://docs.datastax.com/en/cql/3.3/cql/cql_using/useInsertList.html 

nodejs commands for modelDetails 

var query = 'INSERT INTO tensorServing.modelDetails (modelID,modelDesc,,modelPath,paper_link,tags,published,developer_username) VALUES (?,?,?,?,?,?,?)';
var tags = ["tags1","tags2"];

client.execute (query,[243302be-6bcf-4ea5-8dd1-c5497b6d2e0c,"modelDesc","modelPath","paper_link",tags,false,"developer_username"],{ prepare: true}, function(err,result) {
	console.log("hello");
});