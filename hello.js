var http= require("http");
var a=1;
var manejador=function (solicitud, respuesta) {
	console.log('Hola Mundo');
	console.log(a);
	a=a+1
	respuesta.end();
}

var servidor = http.createServer(manejador);
servidor.listen(8080);