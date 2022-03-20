const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
    clientID : "232712110661-u9esenc14lu6f0mv9ii6tcehla79fr42.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL : "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("Error in google strategy passport");
                return;
            }
            console.log(profile);
            if(user){
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