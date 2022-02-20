const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;

// connect static directory
app.use(express.static('./assets'));

// expess layout npm install express-ejs-layouts)
app.use(expressLayouts);

// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
