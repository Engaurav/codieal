const { response } = require('express')
const User = require('../models/user')

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

//render signup page
module.exports.signup = function(req,res){
    return res.render('signup',{
        title : 'SignUp!',
    })
}

//rednder signin page
module.exports.signIn = function(req,res){
    return res.render('signin',{
        title:"Codeial | SignIn",
    })
}

// get the sign up data
module.exports.create = function(req,res){
    // TODO Later
    
    console.log(req.body);
    console.log(req.body.password);
    console.log(req.body.cnf_psd);
    if(req.body.password != req.body.cnf_psd)
    {
        return res.redirect('back');
    }
    

    User.find({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user signing up');
            return;
        }
        console.log(user.length);
        if(user.length==0){
            console.log('if');
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in finding user signing up');
                    return;
                }
                console.log(user);
                return res.redirect('/users/sign-in')
            })
        }else{
            console.log('else');
            return res.redirect('back');
          
        }
    });
}


//sign in create session for user
module.exports.createSession = function(req,res){
    //STEPS TO authenticate
    // find user Later
    console.log(req.body);
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user signing up');
            return;
        }
        
        //handle user found
        if(user.length!=0){
            
            // handle password which  not match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
            //handle session creation 

        }else{
            return res.redirect('back');
        }
    }); 
    //handle user not found
}