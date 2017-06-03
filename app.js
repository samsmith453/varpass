var express = require("express");
var bodyParser = require("body-parser");

var initialAffiliateInterest = require("./mail/initialAffiliateInterest.js");
var sendTheirCode = require("./mail/sendTheirCode.js");
var sendMeNewAffil = require("./mail/sendMeNewAffiliate.js");
var generateCode = require("./generateAffiliateCode.js");
var confirmTheirPackageViaEmail = require("./mail/confirmPackageViaEmail.js");
var notifyMeOfPurchase = require("./mail/notifyMeOfPurchase.js");
var sendQResponse = require("./mail/sendQResponse.js");

var stripe = require("stripe")(process.env.SK);
var cookieParser = require("cookie-parser");

require('dotenv').load();

var app = express();
app.use(cookieParser());

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/affiliates", function(req, res){
	res.sendFile(__dirname + "/public/html/affiliate.html");
});

app.get("/join", function(req, res){
	res.sendFile(__dirname + "/public/html/join.html");
});

app.get("/details", function(req, res){
	res.sendFile(__dirname + "/public/html/index.html");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/notifyone", function(req, res){
	var email = req.body.email;
	initialAffiliateInterest(email); //sends me their email
	res.redirect("/affiliatereg?email="+email);
});

app.get("/affiliatereg", function(req, res){
	res.sendFile(__dirname + "/public/html/affiliatereg.html");
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
	res.sendFile(__dirname + "/public/html/newaffiliate.html");
});

app.get("/joinvarpass", function(req, res){
	res.sendFile(__dirname + "/public/html/joinvarpass.html");
});

app.post("/fasttrack", function(req, res){
	var token = req.body.stripeToken;
	var email = req.body.stripeEmail;
	var affilCode = req.cookies.code;
	if(!affilCode) affilCode = "none";
	var charge = stripe.charges.create({
		amount: 9900,
		currency: "gbp",
		description: "Fast track",
		source: token,
	}, function(err, charge) {
	confirmTheirPackageViaEmail("FastTrack", email);
	notifyMeOfPurchase("fasttrack", email, affilCode);
	res.redirect("/welcome?p=fasttrack");
	});
});

app.post("/insurance", function(req, res){
	var token = req.body.stripeToken;
	var email = req.body.stripeEmail;
	var affilCode = req.cookies.code;
	if(!affilCode) affilCode = "none";
	var charge = stripe.charges.create({
		amount: 1900,
		currency: "gbp",
		description: "Insurance",
		source: token,
	}, function(err, charge) {
	confirmTheirPackageViaEmail("Problems Insurance", email);
	notifyMeOfPurchase("insurance", email, affilCode);
	res.redirect("/welcome?p=insurance");
	});
});

app.post("/banking", function(req, res){
	var token = req.body.stripeToken;
	var email = req.body.stripeEmail;
	var affilCode = req.cookies.code;
	if(!affilCode) affilCode = "none";
	var charge = stripe.charges.create({
		amount: 3900,
		currency: "gbp",
		description: "Banking",
		source: token,
	}, function(err, charge) {
	confirmTheirPackageViaEmail("Bank Account Setup", email);
	notifyMeOfPurchase("banking", email, affilCode);
	res.redirect("/welcome?p=banking");
	});
});

app.get("/welcome", function(req, res){
	res.sendFile(__dirname + "/public/html/welcome.html");
});

app.get("/questionaire", function(req, res){
	res.sendFile(__dirname + "/public/html/questionaire.html");
});

app.post("/qresponse", function(req, res){
	var response = JSON.stringify(req.body);
	var name = req.body.name;
	sendQResponse(response);
	res.redirect("/qconfirm?n="+name);
});

app.get("/qconfirm", function(req, res){
	res.sendFile(__dirname + "/public/html/qconfirm.html");
});

var server = app.listen(process.env.PORT || 3000);
