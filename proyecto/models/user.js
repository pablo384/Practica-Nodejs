var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var uri = "mongodb://pablo384:2323@pruebas-shard-00-00-uiwkf.mongodb.net:27017,pruebas-shard-00-01-uiwkf.mongodb.net:27017,pruebas-shard-00-02-uiwkf.mongodb.net:27017/pruebas?ssl=true&replicaSet=pruebas-shard-0&authSource=admin";
mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("-------------Conectado con MongoDB-----------------------------");
});

//Esquemas son la estructura de nuestro Objeto
var posibles_valores=["M", "F"];
var email_match=[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,"Coloca un email valido"];
var user_schema = new Schema({
	name:String,
	last_name:String,
	username:{type:String, require:true, maxLength:[50,"Username muy grande"]},
	password:{type:String, minLength:[8,"El password es muy corto"]},
	age:{type:Number, min:[5, "La edad no puede ser menor que 5"], max:[100,"La edad no puede ser mayor que 100"]},
	email:{type:String, require:"El correo es obligatorio", match:email_match},
	date_of_birth:Date,
	sex:{type:String, enum:{values:posibles_valores, message:"Opcion no validad"}}

})

user_schema.virtual("password_confirmation").get(function () {
	return this.p_c;
}).set(function (password) {
	this.p_c=password;
})

// user_schema.virtual("full_name").get(function () {
// 	return this.name+this.last_name;
// }).set(function (full_name) {
// 	var words =  full_name.split(" ");
// 	this.name=words[0];
// 	this.last_name=words[1];
// })

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