const nodeMailer = require('../config/nodemailer');




//this is another way of exporting a method
exports.newComment = (comment)=>{
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'paglaediot@gmail.com', // sender address
        to: comment.user.email, // list of receivers
        subject: "New Comment Published ✔", // Subject line
        html: htmlString, // html body
        },(err, info) => {
            if (err){
                console.log('Error in sending mail', err);
                return;
            }
    
            console.log('Message sent', info);
            return;
        }
    );
} 