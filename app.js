var express = require("express");

var app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/index.html");
});

app.get("/affiliates", function(req, res){
	res.sendFile(__dirname + "/public/affiliate.html");
});

app.get("/join", function(req, res){
	res.sendFile(__dirname + "/public/join.html");
});

app.get("/details", function(req, res){
	res.sendFile(__dirname + "/public/index.html");
});

var server = app.listen(process.env.PORT || 3000);
