const User = require('../models/user')
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user : user
        });
    });
    
}

//update profile
module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('***Multer Error',err);
                } 
                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){                    

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    //this is saving path of the upload into avatar field
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');

            });


        } catch (error) {
            req.flash('error',error)
            return res.redirect('back');
        }
        // User.findByIdAndUpdate(req.user.id,req.body,function(err,user){
        //     return res.redirect('back');
        // });
    }
    else{
        req.flash('error','Unauthorised');
        return res.status(401).send('Unauthorized');
    }
}

//render signup page
module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('signup', {
        title: 'SignUp!',
    })
}

//rednder signin page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('signin', {
        title: "Codeial | SignIn",
    })
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.cnf_psd) {
        return res.redirect('back');
    }


    User.find({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding user signing up');
            return;
        }
        console.log(user.length);
        if (user.length == 0) {
            console.log('if');
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in finding user signing up');
                    return;
                }
                console.log(user);
                return res.redirect('/users/sign-in')
            })
        } else {
            console.log('else');
            return res.redirect('back');

        }
    });
}


//sign in create session for user
module.exports.createSession = function (req, res) {
    // TODO Later
    req.flash('success','Logged in Successfully');
    return res.redirect('/');

}


module.exports.destroySession = function(req,res){
    req.logout();
    
    req.flash('success','Logged Out');
    return res.redirect('/users/sign-in');
}


//add a post
module.exports.addPost = function(req,res){
    
}