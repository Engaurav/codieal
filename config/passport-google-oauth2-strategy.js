const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environments');

//tell passport to use a new strategy for goodle login
passport.use(new googleStrategy({
    clientID : env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL : env.google_call_back_url
    },
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("Error in google strategy passport");
                return;
            }
            console.log(profile);
            if(user){
                //if user found ,set user as req.user
                return done(null,user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                },function(err,user){
                    if(err){
                        console.log("Error in creating google strategy passport");
                        return;
                    }
                    return done(null,user);
                })
            }
        })
    }
));
