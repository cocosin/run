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
    databaseSync = usersMethods.databaseSync;

let currentSession = session({
    name: 'user_session',
    secret: '__12',
    maxAge: 1000*60*60*24*14
});

let logout = (req, res) => {
    res.render('error');
    req.session.destroy();
};

passport.serializeUser(function(user, done) {
    console.log(user, 2);

    if (!user) {
        return done(null, false);
    }

    done(null, user.login);
});

passport.deserializeUser(function(login, done) {
    console.log(login);
    User.findOne({where:{login}}).then(
        (user) => {
            console.log(user, 1);
            done(null, {
                id: user.dataValues.id,
                login: user.dataValues.login,
                email: user.dataValues.email
            });
        },
        () => {
            console.log('ошибка при десериализации');
        });
});

passport.use(new LocalStrategy(
    function(login, password, done) {
        console.log(login);
        User.findOne(
            {
                where: {
                    login
                },
                attributes: ['id', 'email', 'login', 'pass_hash']
            }
        ).then(
            (user) => {
                console.log(login, password, user.dataValues);
                if (password !== user.dataValues.pass_hash) {
                    console.log('password error');
                    //return done(null, user);
                    return done(null, 0, { message: 'Incorrect password.' });
                }

                console.log('password success');
                return done(null, {
                    id: user.dataValues.id,
                    login: user.dataValues.login,
                    email: user.dataValues.email
                });


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