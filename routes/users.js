const express = require('express');
const router = express.Router();
const passport = require('passport');


const usersConrtoller = require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication, usersConrtoller.profile);

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

module.exports = router;