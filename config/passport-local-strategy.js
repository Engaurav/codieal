const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new localStrategy({
    usernameField : 'email'
},function(email,password,done){
    //find a user and establish the identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('Error in finding user -->Passport');
            return;
        }
        if(!user || user.password != password){
            console.log('Invalid user name and password');
            return done(null,false);
        }
        return done(null,user);
    })
}
));

//serializing the user to decide which key is to be in cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});


//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user -->Passport');
            return;
        }
        return done(null,user);
    });
});


//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in , then pass on the request to the next function( controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('sign-in')
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from session cookie and we are just sending this to locals for the views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;