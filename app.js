var express = require("express");
var bodyParser = require("body-parser");

var initialAffiliateInterest = require("./public/mail/initialAffiliateInterest.js");
var sendTheirCode = require("./public/mail/sendTheirCode.js");
var sendMeNewAffil = require("./public/mail/sendMeNewAffiliate.js");
var generateCode = require("./public/generateAffiliateCode.js");

require('dotenv').load();

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/notifyone", function(req, res){
	var email = req.body.email;
	initialAffiliateInterest(email); //sends me their email
	res.redirect("/affiliatereg?email="+email);
});

app.get("/affiliatereg", function(req, res){
	res.sendFile(__dirname + "/public/affiliatereg.html");
});

app.post("/regsubmission", function(req, res){
	var email = req.body.email;
	var name = req.body.name;
	var nation = req.body.nationality;
	var code = generateCode(name);
	sendTheirCode(email, name , code);
	sendMeNewAffil(email, name, nation, code);
	res.redirect("/newaffiliate?email="+email+"&name="+name);
});

app.get("/newaffiliate", function(req, res){
	res.sendFile(__dirname + "/public/newaffiliate.html");
});

var server = app.listen(process.env.PORT || 3000);
