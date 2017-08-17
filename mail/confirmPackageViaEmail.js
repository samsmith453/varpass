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

	console.log("Initial sale email");

	var message = {
	    from: 'careteam@varpass.com',
	    to: email,
	    subject: 'Welcome to the VarPass Family!',
	    text: "Hello and congratulations on joining the " + package+ " scheme. We're going to take good \
		care of you and we can't wait to meet you! In order to help you as much as we can, please \
		fill in this questionaire about you. If you have any questions, please just reply to this email. \
		Complete this questionaire: www.varpass.com/questionaire?e=" + email + "&p=" + package,
	    html: "<h2>Hello and congratulations on joining the " + package + " scheme.</h2>\
			<h2>We're going to take good care of you and we can't wait to meet you!</h2>\
			<p>In order to help you as much as we can, please fill in this questionaire about you. \
				If you have any questions, please just reply to this email.</p>\
				<h3>Complete this questionaire: <a href='https://www.varpass.com/questionaire?e="+email+"&p="+package+"'>Click here</a></h3>"
	};

	var transporter = nodemailer.createTransport(smtpConfig);
	transporter.sendMail(message, function(error, response){  //callback
           if(error){
             console.log(error);
          } else{
             console.log("Sent");
         }
	 });
}
