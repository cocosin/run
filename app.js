"use strict";
let express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    auth = require('users/auth'),
    bodyParser = require('body-parser'),
    log = require('./libs/logs')(module),
    app = express(),
    passport = auth.passport;

let routes = require('./routes/index'),
    config = require('config');

// view engine setup
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (app.get('env') === 'development') {
    app.set('trust proxy', 1);
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}
app.use(auth.currentSession)
    .use(function (req, res, next) {
        // Update views
        next();
    })
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(cookieParser())
   .use(express.static(path.join(__dirname, 'public')))
   .use(passport.initialize())
   .use(passport.session())
   .use('/', routes);

log.info('started on 3000');

// will print stacktrace
if (app.get('env') === 'development') {
    app.set('trust proxy', 1);
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
