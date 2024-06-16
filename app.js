var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session');
const flash = require('connect-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({ // isse aap allow krre the ki session save HOPAEE
  resave: false,
  saveUninitialized: false,
  secret : "Pahul"
}));

app.use(passport.initialize());
app.use(passport.session());  // iss session BNNRHA H
passport.serializeUser(usersRouter.serializeUser()); // this is thee full code where checking takes place
passport.deserializeUser(usersRouter.deserializeUser());



app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
