/**
 * Created by Constantine on 01.11.2015.
 */
'use strict';
let session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs');
require('rootpath')();

let usersMethods = require('users/index'),
    log = require('libs/logs')(module),
    User = usersMethods.User,
    database = require('database'),
    databaseSync = database.sync();

let currentSession = session({
    name: 'user_session',
    secret: '__1',
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

passport.serializeUser(function(user, done) {
    done(null, user.dataValues.login);
});

passport.deserializeUser(function(login, done) {
    User.find({login}).then(
        (user) => {
            console.log('deserialized!111');
            done(null, user);
        },
        () => {
            console.log('ошибка при десериализации');
        });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.find({ login: username }).then(
            (user) => {

                bcrypt.compare(password, user.dataValues.password, function(err, res) {
                    console.log(err, res, user.dataValues.password, password);
                });

                if (!password) {
                    console.log('password error');
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
        }, (err) =>{
                if (err) log.info(err);
            }
        );
    }
));


module.exports = {
    currentSession,
    logout,
    passport
};