var express = require("express");
var bodyParser = require("body-parser");

var initialAffiliateInterest = require("./mail/initialAffiliateInterest.js");
var sendTheirCode = require("./mail/sendTheirCode.js");
var sendMeNewAffil = require("./mail/sendMeNewAffiliate.js");
var generateCode = require("./generateAffiliateCode.js");
var confirmTheirPackageViaEmail = require("./mail/confirmPackageViaEmail.js");
var notifyMeOfPurchase = require("./mail/notifyMeOfPurchase.js");
var sendQResponse = require("./mail/sendQResponse.js");

require('dotenv').load();

var stripe = require("stripe")(process.env.SK);
var cookieParser = require("cookie-parser");

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
		amount: 3500,
		currency: "gbp",
		description: "Fast track",
		source: token,
	}, function(err, charge) {
	confirmTheirPackageViaEmail("VarPass FastTrack Membership", email);
	notifyMeOfPurchase("fasttrack", email, affilCode);
	res.redirect("/welcome?p=fasttrack");
	});
});

app.post("/remote", function(req, res){
	var token = req.body.stripeToken;
	var email = req.body.stripeEmail;
	var affilCode = req.cookies.code;
	if(!affilCode) affilCode = "none";
	var charge = stripe.charges.create({
		amount: 2500,
		currency: "gbp",
		description: "VarPass Remote",
		source: token,
	}, function(err, charge) {
		if(err) throw err;
		confirmTheirPackageViaEmail("Remote Assitance", email);
		notifyMeOfPurchase("remote", email, affilCode);
		res.redirect("/welcome?p=remote");
	});
});

app.post("/premium", function(req, res){
	var token = req.body.stripeToken;
	var email = req.body.stripeEmail;
	var affilCode = req.cookies.code;
	if(!affilCode) affilCode = "none";
	var charge = stripe.charges.create({
		amount: 5900,
		currency: "gbp",
		description: "VarPass Premium Member",
		source: token,
	}, function(err, charge) {
	confirmTheirPackageViaEmail("Premium VarPass Membership", email);
	notifyMeOfPurchase("premium", email, affilCode);
	res.redirect("/welcome?p=premium");
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

app.get("/tours", function(req, res){
	res.sendFile(__dirname + "/public/html/tours.html");
});

app.post("/booktour", function(req, res){
	//send them confirmation
	//send me details
	var details = req.body;
	res.redirect("/tourconfirm");
});

var server = app.listen(process.env.PORT || 3000);
