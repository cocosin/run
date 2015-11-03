"use strict";
let express = require('express'),
    router = express.Router(),
    rootpath = require('rootpath')();

let users = require('routes/users'),
    config = require('config'),
    auth = require('users/auth'),
    settings = require('settings'),
    passport = auth.passport;


router.post('/login',
    passport.authenticate('local', { successRedirect: '/err',
        failureRedirect: '/logout',
        failureFlash: true })
);

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
