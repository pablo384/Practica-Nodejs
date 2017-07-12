var http= require("http"),
	fs=require("fs"),
	parser =require("./params_parse.js");

var p = parser.parse;


http.createServer(function (req,res) {
	// console.log("========================\n\n");
	// console.log(req);
	// console.log("========================\n\n");

	if (req.url.indexOf("favicon.ico") >0) {return;}

fs.readFile("./index.html", function (error,html) {
	
	var html_string=html.toString();
	
	var variables=html_string.match(/[^\{\}]+(?=\})/g);
	var nombre="Pablo";

	var parametros=p(req);

	

	for (var i = variables.length - 1; i >= 0; i--) {
		var variable = variables[i];

		html_string=html_string.replace("{"+variables[i]+"}", parametros[variable]);
	}

	res.writeHead(200,{"Content-Type":"text/html"});
	res.write(html_string);
	res.end();

	});

}).listen(8080);