"use strict";
let express = require('express'),
    router = express.Router(),
    database = require('database');

/* GET users listing. */
router.get('/users', (req, res) => {
    res.send('respond with a resource');
});

router.post('/users', (req, res) => {
    console.log(req.body);
});

module.exports = router;
