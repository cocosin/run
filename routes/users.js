"use strict";
let express = require('express'),
    app = express.Router(),
    database = require('database'),
    rootpath = require('rootpath')(),
    config = require('config'),
    users = require('users/index');

app.post('/users', (req, res) => {
    console.log(req.body);
    res.send(JSON.stringify(req.body));
});

app.get('/users', (req, res) => {
    res.send(JSON.stringify(req.user ? req.user : {}));
});

app.post('/current', (req, res) => {
    if (req.user) {
        res.send(JSON.stringify(req.user));
    }
});

module.exports = app;
