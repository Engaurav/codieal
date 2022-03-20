const express = require('express');
const router = express.Router();
const passport = require('passport');


const usersConrtoller = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication, usersConrtoller.profile);

router.post('/update/:id',usersConrtoller.update);

router.get('/sign-up',usersConrtoller.signup);

router.get('/sign-in',usersConrtoller.signIn);


//create user for sign up
router.post('/create',usersConrtoller.create);


//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersConrtoller.createSession);


//signout
router.get('/sign-out',usersConrtoller.destroySession);


//google authentication
router.get('/auth/google',passport.authenticate('google',{scope :['profile','email']}));


//callback google
router.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect:'/users/sign-in'
}), usersConrtoller.createSession);

module.exports = router;