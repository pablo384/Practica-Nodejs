var express = require("express");
var bodyParser=require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");
var routes_app = require("./routes_app");
var session_middleware = require("./middlewares/session");
var app = express();

 
app.use("/public",express.static("public"));
// app.use("estatico",express.static("assets"));
app.use(bodyParser.json()); //peticiones application/json
app.use(bodyParser.urlencoded({extended:true})); 
app.set("view engine", "jade");
app.use(session({
    secret:"asdf2fs1a23sdfssa3d1",
    resave: false,
    saveUnitialized: false
}));

app.get("/", function (req, res) {
    console.log(req.session.user_id);
    res.render("index");
});

app.get("/signup", function (req, res) {

    User.find(function(err,doc){
        console.log(doc);
        res.render("signup");
    })    
});
app.get("/login", function (req, res) {
    res.render("login");
       
});

app.post("/sessions", function (req,res) {

    // User.findById("596af11f3190b66240d97205",function (err,doc) {
        
    // });
    User.findOne({
        email:req.body.email,
        password: req.body.password},function (err,user) {
            console.log(user);
            // res.send("Hola Mundo");

            req.session.user_id= user._id;
            res.redirect("/app");
        
    })

    // var user= new User({
    //     email: req.body.email, 
    //     password: req.body.password,
    //     password_confirmation: req.body.password_confirmation,
    //     username:req.body.username
    // });

    // user.save().then(function (us) {
    //     res.send("Guardamos tus datos exitosamente");
    // }, function (err) {
    //     console.log(String(err));
    //     res.send("No pude guardar los datos (O.o)");
    // })
    

    // user.save(function (err, user, numero) {
    //     if (err) {
    //         console.log(String(err));
    //     }
    //     res.send("Guardamos tus datos");
    // });
    
})
app.use("/app", session_middleware);
app.use("/app",routes_app);
app.listen(8080);