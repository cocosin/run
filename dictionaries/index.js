
// различные справочнки
"use strict";
let path = require('path');

let countries = JSON.parse(path.join(__dirname, 'countries.json')),
    cities = JSON.parse(path.join(__dirname, 'cities.json'));

module.exports = {
    countries,
    cities
};