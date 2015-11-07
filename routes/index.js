"use strict";
let express = require('express'),
    router = express.Router(),
    rootpath = require('rootpath')();

let users = require('routes/users'),
    config = require('config'),
    auth = require('users/auth'),
    settings = require('settings'),
    passport = auth.passport;


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log(err, user, info);

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send(user);
        });
    })(req, res, next);
});

router.get(config.get('urls'), function(req, res) {
    if (req.user) {
        console.log('user is here!');
    }
  res.sendFile(settings.root_path + 'public/index.html');
});

router.get('/err', (req,res) => {
    req.session.authorized = true;
    res.render('error');
});

router.get('/logout', auth.logout);

router.use(users);

module.exports = router;
