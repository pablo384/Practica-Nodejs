var express = require("express");
var bodyParser=require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//mongoAtlas
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://pablo384:2323@pruebas-shard-00-00-uiwkf.mongodb.net:27017,pruebas-shard-00-01-uiwkf.mongodb.net:27017,pruebas-shard-00-02-uiwkf.mongodb.net:27017/pruebas?ssl=true&replicaSet=pruebas-shard-0&authSource=admin";





//conexion con bd
// mongoose.createConnection("mongodb://localhost/fotos", {
// 	useMongoClient: true,
// });

var userSchemaJSON={
	email:String,
	password:String
};

var user_schema = new Schema(user_schema);
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

	// var cursor = db.collection('Users').find({});
	// console.log(cursor);
	// User.find(function (err,doc) {
	// 	console.log(doc);
	res.render("login");
	// })
	
});

app.post("/users", function (req,res) {
	
	MongoClient.connect(uri, function(err, db) {
	  // Paste the following examples here

//--------------------------------------------
	db.collection('inventory').insertMany([
	   // MongoDB adds the _id field with an ObjectId if _id is not present
	   { item: "journal", qty: 25, status: "A",
	       size: { h: 14, w: 21, uom: "cm" }, tags: [ "blank", "red" ] },
	   { item: "notebook", qty: 50, status: "A",
	       size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank" ] },
	   { item: "paper", qty: 100, status: "D",
	       size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank", "plain" ] },
	   { item: "planner", qty: 75, status: "D",
	       size: { h: 22.85, w: 30, uom: "cm" }, tags: [ "blank", "red" ] },
	   { item: "postcard", qty: 45, status: "A",
	       size: { h: 10, w: 15.25, uom: "cm" }, tags: [ "blue" ] }
	])
	.then(function(result) {
	  // process result
	});


//----------------------------------------------




	  db.close();
	});
	
})

app.listen(8080);