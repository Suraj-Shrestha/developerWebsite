var express             = require('express');
var app                 = express();
var port                = process.env.PORT || 3000;
var mongoose            = require('mongoose');
var passport            = require('passport');
var flash               = require('connect-flash');
var morgan              = require('morgan');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var session             = require('express-session');
var configDB            = require('./config/database.js');
var path                = require('path');

mongoose.connect(configDB.url);

//real time get post messages
app.use(morgan('dev'));

//for cookies 
app.use(cookieParser());

//get data from html forms
app.use(bodyParser());

//setting up view engine
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname , 'public')));

//Infrastructure for passport
app.use(session({secret: 'testingmeanstackauthentication'}));
app.use(passport.initialize());
//to persist login sessions
app.use(passport.session());
//used to show messages stored in session
app.use(flash());

//pass passport for configuration
require('./config/passport')(passport);

/*------------------------------------
routes start here and app and completely configured passport are passed here
-------------------------------------*/
//routes are loaded and 
require('./app/routes.js')(app,passport);


//
app.listen(port);
console.log("Listening at :" +port);
