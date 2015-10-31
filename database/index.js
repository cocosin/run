'use strict';
let Sequelize = require('sequelize');

let config = require('config');

let sequelize = new Sequelize(config.get('pg:database'), config.get('pg:user'), config.get('pg:password'), {
    dialect: 'postgres',
    protocol: "postgres",
    host: config.get('pg:host'),
    port: config.get('pg:port')
});

module.exports = sequelize;