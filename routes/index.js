"use strict";
let express = require('express'),
    router = express.Router(),
    rootpath = require('rootpath')(),
    settings = require('settings');

let users = require('routes/users'),
    config = require('config');


router.get(config.get('urls'), function(req,res) {
  res.sendFile(settings.root_path + 'public/index.html');
});

router.get('/err',function(req,res) {
  res.render('error');
});

router.use(users);

module.exports = router;
