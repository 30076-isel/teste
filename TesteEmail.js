/**
 * Created by ISEL on 01-07-2014.
 */
var nodemailer = require("nodemailer");
var fs = require('fs');

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "iselusercontrol@gmail.com",
        pass: "Isel#30076"
    }
});


    smtpTransport.sendMail({
        from: "My Name <pdpcoelho@gmail.com>", // sender address
        to: "Your Name <pdpcoelho@gmail.com>", // comma separated list of receivers
        subject: "Hello ✔", // Subject line
        html: "<html><head><title>teste</title></head><body><h1>Teste</h1><a href='www.google.pt'>Google</a></body></html>"
    }, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    });
