"use strict";
let nconf = require('nconf');
let path = require('path');

nconf.argv().env().file({ file: path.join(__dirname, 'config.json') });

module.exports = nconf;

// .urls - чтобы при обновлении страницы не сбрасывался роутинг фронта