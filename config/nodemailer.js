const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');



//for sending emails
let transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "paglaediot", // generated ethereal user
      pass: "ifucku@143", // generated ethereal password
    }
});

//for rendering emails of html type
let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,"../views/mailers",relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error in rendering template",err); 
                return;
            }
            mailHTML = template;
        });
    return mailHTML;
}



// exporting module
module.exports = {
    transporter : transporter,
    renderTemplate: renderTemplate,
}