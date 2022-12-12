var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/globals');

//const for security token
const passport = require ('passport');
const BasicStrategy = require('passport-http').BasicStrategy;


//router declaring
var indexRouter = require('./routes/index');

//api endpoints routers
var moviesApiRouter = require('./routes/api/movies');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Initialize
app.use(passport.initialize());


passport.use(new BasicStrategy((username, password, done) => {

// User.findOne({username: userid}, function(err, user){
//   if (!user.verifyPassword(password)){
//     return done(null, false);
//   }else{
//     return done(null, false);
//   }
// })

//password authetication
if (username == 'admin' && password == 'Georgian123'){
  console.log('Admin authentication success');
  return done(null, username);
} else {
  console.log(username+ 'Admin authentication unsuccessful');
  return done(null, username);
}
}));


//router end points
app.use('/', indexRouter);  
app.use('/api/movies', passport.authenticate('basic',{session: false}), moviesApiRouter);

//connect mongoose mongodb
mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true })
.then((message) => { console.log('connected successfully');})
.catch((error)=>{ console.log('error while connecting ${error}');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
