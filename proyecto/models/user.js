var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var uri = "mongodb://pablo384:2323@pruebas-shard-00-00-uiwkf.mongodb.net:27017,pruebas-shard-00-01-uiwkf.mongodb.net:27017,pruebas-shard-00-02-uiwkf.mongodb.net:27017/pruebas?ssl=true&replicaSet=pruebas-shard-0&authSource=admin";
mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Conectado con MongoDB ...");
});

//Esquemas son la estructura de nuestro Objeto

var user_schema = new Schema({
	name:String,
	username:String,
	password:String,
	age:Number,
	email:String,
	date_of_birth:Date

});

//Creando MOdelo
var User = mongoose.model("User", user_schema);

module.exports.User=User;

/* 
String
Number
Date
Buffer
Boolean
Mixed
Objectid
Array
*/