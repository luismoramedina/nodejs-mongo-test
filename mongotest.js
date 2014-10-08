	//npm install mongodb
	var MongoClient = require('mongodb').MongoClient;
	var config = require("./config.json");
	console.log("config loaded:" + config);
	var MONGO_URL = config["database_url"];
	//var MONGO_URL = "mongodb://localhost:27017/exampleDb";

	var getUsers = function(callback) {
		console.log("In getUsers");
		var users = {};
		MongoClient.connect(MONGO_URL, function(err, db) {
	  if(!err) {
		console.log("We are connected");
		db.collection('users', function(err, collection) {
			console.log("erro on get collection" + err);
			collection.findOne({'user':'luismoramedina'}, function(err, item) {
				console.dir("find one: " + JSON.stringify(item));
			});
			collection.find({}, {'_id': 0, 'access_token': 0}).toArray(function(err, items) {
				console.dir("find all: " + JSON.stringify(items));
				if(callback) {
					callback(null, items);
				}
				return items;
			});
		});

	  } else {
		  console.log("err" + err);
		  return null;
	  }
	});
	}

	module.exports.getUsers = getUsers;

getUsers();
