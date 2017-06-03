module.exports = function(package, email){
	var nodemailer = require("nodemailer");

	var smtpConfig = {
		host: "smtp.zoho.com",
		port: 465,
		auth: {
			user: "careteam@varpass.com",
			pass: process.env.ZOHO_PASS
	   	}
	};

	var message = {
	    from: 'careteam@varpass.com',
	    to: email,
	    subject: 'Congratulations! Welcome to VarPass',
	    text: "Hi your package is " + package+".",
	    html: '<h2> Hi '+package+' </h2>'
	};

	var transporter = nodemailer.createTransport(smtpConfig);
	transporter.sendMail(message, function(error, response){  //callback
           if(error){
             console.log(error);
          } else{
             console.log("Message sent: " + res.message);
         }
	 });
}
