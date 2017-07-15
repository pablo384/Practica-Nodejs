var express = require("express");
var bodyParser=require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//mongoAtlas
// var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://pablo384:2323@pruebas-shard-00-00-uiwkf.mongodb.net:27017,pruebas-shard-00-01-uiwkf.mongodb.net:27017,pruebas-shard-00-02-uiwkf.mongodb.net:27017/pruebas?ssl=true&replicaSet=pruebas-shard-0&authSource=admin";

mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Conectado con MongoDB ...");
});


var userSchemaJSON={
	email:String,
	password:String
};

var user_schema = new Schema(userSchemaJSON);
var User = mongoose.model("User", user_schema);
// mongoose.then(function(User){});
 
app.use("estatico",express.static("public"));
app.use("estatico",express.static("assets"));
app.use(bodyParser.json()); //peticiones application/json
app.use(bodyParser.urlencoded({extended:true})); 
app.set("view engine", "jade");

app.get("/", function (req, res) {
	res.render("index");
});

app.get("/login", function (req, res) {

	User.find(function(err,doc){
		console.log(doc);
		res.render("login");
	})

	
});

app.post("/users", function (req,res) {

	var user= new User({email: req.body.email, password: req.body.password});
	user.save(function (err) {
		if (err) {
			console.log(err);
		}else {
			res.send("Guardamos tus datos");
		}
		
	})
	
})

app.listen(8080);