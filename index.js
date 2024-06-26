const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose'); 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract styles and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
   name : 'codieal',
   secret : 'blashsomething',
   saveUinitalized: false,
   resave:false,
   cookies:{
        maxAges:(1000*60*30)
   }
}));

app.use(passport.initialize());
//hello checking wethre git hub is working properly or not
app.use(passport.session());

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});