var http = require("http");
var url = require("url");
var db = require("./mongotest");
console.dir("db -> " + db);
var port = 4444;
http.createServer(function(request, response) {
	var parsedUrl = url.parse(request.url, true);
  	var queryAsObject = parsedUrl.query;

	console.log("query: " + JSON.stringify(queryAsObject));
	response.writeHead(200, {"Content-Type": "text/html"});
	db.getUsers(function (err, data) {
		console.log("err: " + err);
		console.log("users: " + data);
		response.write(JSON.stringify(data));
		response.end();		
	} );
	console.log("Served!");
}).listen(4444);

console.log("listening on port: " + port);

//goto http://port-4444.jg8cina5by0kke29dqvxym5uuneo2yb9mpx60ahfmi7tx1or.box.codeanywhere.com/
