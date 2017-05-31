module.exports = function(address, name, code){

	//sends affiliate their code once signed up

	var nodemailer = require("nodemailer");
	var link = "varpass.com/" + code

	var smtpConfig = {
		host: "smtp.zoho.com",
		port: 465,
		auth: {
			user: "ambassadors@varpass.com",
			pass: process.env.ZOHO_PASS
	   	}
	};

	var message = {
	    from: 'ambassadors@varpass.com',
	    to: address,
	    subject: 'Congratulations! You\'re a VarPass Ambassador',
	    text: "Hi " + name +", You're now a VarPass ambassador. Your link is " + link +". If anyone signs up through that link we will pay you 1/3 of their fee. If you have any questions, feel free to email us at ambassadors@varpass.com. Kind regards, VarPass Team",
	    html: '<h2> Hi '+name+',</h2>\
		<h3>You\'re now a VarPass ambassador.<br><br> Your link is '+ link +'.<br><br> If anyone signs up through that link we will pay you 1/3 of their fee. <br> If you have any questions, feel free to email us at ambassadors@varpass.com.<br><br> Kind regards,<br> VarPass Team</h3>'
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
