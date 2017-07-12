var express = require("express");

var app = express();

app.set("view engine", "jade");
//Verbos Http => GET / POST /PUT / PATCH / OPTIONS / HEADERS / DELETE
app.get("/", function (req, res) {
	res.render("index");
});

app.post("/", function (req, res) {
	res.render("form");
})
app.listen(8080);