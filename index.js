const express = require('express');
const env = require('./config/environments')
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const db = require('./config/mongoose')

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy')

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash');
const customMware = require('./config/middleware')
const path = require('path');


//for scss middleware
app.use(sassMiddleware({
    src: path.join(__dirname,env.asset_path,'/scss'),
    dest:path.join(__dirname,env.asset_path,'/css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


app.use(express.urlencoded());
app.use(cookieParser());

// connect static directory
app.use(express.static(env.asset_path));



//make the upload path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'))


// expess layout npm install express-ejs-layouts)
app.use(expressLayouts);

//extract style and script from webpages into the layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)





// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//creating session middleware
app.use(session({
    name: 'codeial',
    //todo change secret before deployment 
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled',
    }, function(err) {
        console.log(err || 'connect mongo db setup ok ');
    })

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//add flash for notification
app.use(flash());
app.use(customMware.setFlash);


// use express router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});