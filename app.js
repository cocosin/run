"use strict";
let express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    users = require('./routes/users'),
    config = require('config'),
    log = require('./libs/logs')(module),
    app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'))
   .set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (app.get('env') === 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}
app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(cookieParser())
   .use(express.static(path.join(__dirname, 'public')));

app.engine('.html', function (err) {
    if (err) throw err;
});

app.get('/err',function(req,res) {
    res.render('error');
});

app.get(['/signin','/test'],function(req,res) {
    res.sendFile(__dirname + '/public/index.html');
});

log.info('started on 3000');

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
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
