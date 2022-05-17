const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environments')



//for sending emails
let transporter = nodeMailer.createTransport(env.smtp);

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