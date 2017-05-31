module.exports = function(address){

	//sends me their email

	var nodemailer = require("nodemailer");

	var smtpConfig = {
		host: "smtp.gmail.com",
		port: 465,
		auth: {
			user: "varpassnotify@gmail.com",
			pass: process.env.NOTIFY_PASS
	   	}
	};

	var message = {
	    from: 'sam@deducation.co.uk',
	    to: 'sam@varpass.com',
	    subject: 'Affiliate interest',
	    text: address,
	    html: '<h2>'+address+'</h2>'
	};

	var transporter = nodemailer.createTransport(smtpConfig);
	transporter.sendMail(message, function(error, response){  //callback
           if(error){
             console.log(error);
          } else{
             console.log("Message sent: " + res.message);
         }
	 });
};
