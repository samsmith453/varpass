module.exports = function(address, name, nation, code){

	//sends me their full details

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
	    from: 'sam@deducation.co.uk', //change this email for random one
	    to: 'sam@varpass.com',
	    subject: 'New affiliate',
	    text: "email:"+address+" name:"+name+" nation:"+nation+" code:"+code,
	    html: "<p>email:"+address+" name:"+name+" nation:"+nation+" code:"+code+"</p>"
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
