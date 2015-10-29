"use strict";
let express = require('express'),
    router = express.Router();

let users = require('users'),
    config = require('config');

router.get(config.get('urls'), function(req,res) {
  res.sendFile(__base + '/public/index.html');
});

router.get('/err',function(req,res) {
  res.render('error');
});

router.use(users);

module.exports = router;
