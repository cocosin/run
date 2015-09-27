"use strict";
let express = require('express'),
    router = express.Router(),
    app = express();


/* GET users listing. */
app.get('/users', (req, res) => {
    res.send('respond with a resource');
});

module.exports = router;
