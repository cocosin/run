"use strict";
let express = require('express'),
    router = express.Router(),
    database = require('database'),
    rootpath = require('rootpath')(),
    config = require('config'),
    users = require('users/index');

router.post('/users', (req, res) => {
    console.log(req.body);
    res.send(JSON.stringify(req.body));
});


module.exports = router;
