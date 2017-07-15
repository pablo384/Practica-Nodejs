var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Esquemas son la estructura de nuestro Objeto

var user_schema = new Schema({
	name:String,
	username:String,
	password:String,
	age:Number,
	email:String,
	date_of_birth:Date

});
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