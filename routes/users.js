"use strict";
let express = require('express'),
    router = express.Router(),
    users = require('./users');



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function(req, res) {
    console.log(req,res);
});


module.exports = router;
