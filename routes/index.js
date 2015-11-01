"use strict";
let express = require('express'),
    router = express.Router(),
    rootpath = require('rootpath')();

let users = require('routes/users'),
    config = require('config'),
    auth = require('users/auth'),
    settings = require('settings');


router.get(config.get('urls'), function(req,res) {
  res.sendFile(settings.root_path + 'public/index.html');
});

router.get('/err',function(req,res) {
    req.session.authorized = true;
    res.render('error');
});

router.get('/logout', auth.logout);

router.use(users);

module.exports = router;
