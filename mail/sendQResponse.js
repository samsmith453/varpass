module.exports = function(response){
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
	    from: 'varpassnotify@gmail.com',
	    to: 'sam@varpass.com',
	    subject: 'Questionaire Completed',
	    text: response,
	    html: response
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
