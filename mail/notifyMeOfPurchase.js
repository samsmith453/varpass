module.exports = function(package, email, affilCode){
	var nodemailer = require("nodemailer");

	var smtpConfig = {
		host: "smtp.zoho.com",
		port: 465,
		auth: {
			user: "sam@deducation.co.uk",
			pass: process.env.ZOHO_PASS
	   	}
	};

	var message = {
	    from: 'sam@deducation.co.uk',
	    to: 'sam@varpass.com',
	    subject: 'New purchase',
	    text: "email:"+email+" package:"+package+" code:"+affilCode,
	    html: "<p>email:"+email+" package:"+package+" code:"+affilCode+"</p>"
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
