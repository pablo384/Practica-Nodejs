var http= require("http"),
	fs=require("fs");


http.createServer(function (req,res) {
	// console.log("========================\n\n");
	// console.log(req);
	// console.log("========================\n\n");

	if (req.url.indexOf("favicon.ico") >0) {return;}

fs.readFile("./index.html", function (error,html) {
	
	var html_string=html.toString();
	var arreglo_parametros= [], parametros = {};
	var variables=html_string.match(/[^\{\}]+(?=\})/g);
	var nombre="Pablo";

	if (req.url.indexOf("?")>0) {
		var url_data = req.url.split("?");
		var arreglo_parametros = url_data[1].split("&");
		
	}

	for (var i = arreglo_parametros.length - 1; i >= 0; i--) {
		var parametro = arreglo_parametros[i];
		//nombre=pablo
		var param_data= parametro.split("=");
		parametros[param_data[0]]= [param_data[1]];
		//{nombre:pablo}

	}

	for (var i = variables.length - 1; i >= 0; i--) {
		var variable = variables[i];

		html_string=html_string.replace("{"+variables[i]+"}", parametros[variable]);
	}

	res.writeHead(200,{"Content-Type":"text/html"});
	res.write(html_string);
	res.end();

	});

}).listen(8080);