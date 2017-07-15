var express = require("express");
var bodyParser=require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//conexion con bd
mongoose.createConnection("mongodb://localhost/fotos", {
	useMongoClient: true,
});

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
	User.find(function (err,doc) {
		console.log(doc);
		res.render("login");
	})
	
});

app.post("/users", function (req,res) {
	//creando usuario
	var user = new User({email:req.body.email, password:req.body.password});

	user.save(function (err) {
		if (err) {console.log(err)}
		else {
			res.send("Recibimos tus datos");
		}

	})
	// console.log("Contrasena "+req.body.password);
	// console.log("Email "+req.body.email);
	
})

app.listen(8080);