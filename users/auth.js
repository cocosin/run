/**
 * Created by Constantine on 01.11.2015.
 */
'use strict';
let session = require('express-session'),
    MongoStore = require('connect-mongo')(session);

let currentSession = session({
    name: 'user_session',
    resave: false,
    secret: 'runwithme',
    maxAge: 1000*60*60*24*14,
    store: new MongoStore({
        url: 'mongodb://localhost/user-sessions',
        ttl: 24 * 24 * 60 * 60,
        autoRemove: 'interval',
        autoRemoveInterval: 60*24*14
    }),
    cookie: {
    }
});

let logout = (req, res) => {
    res.render('error');
    req.session.destroy();
};


module.exports = {
    currentSession,
    logout
};