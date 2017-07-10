var http= require("http"),
	fs=require("fs");


http.createServer(function (req,res) {
fs.readFile("./index.html", function (error,html) {
	res.writeHead(200,{"Content-Type":"application/json"});
	res.write(JSON.stringify({nombre:"Pablo", username:"pablo384"}) );
	res.end();
	});

}).listen(8080);