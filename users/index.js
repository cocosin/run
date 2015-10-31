"use strict";
let Sequelize = require('sequelize'),
    _ = require('lodash'),
    rootpath = require('rootpath')();

let database = require('database'),
    dictionaries = require('dictionaries');

let User = database.define('Users', {
    first_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        field: 'first_name'
    },
    last_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        field: 'last_name'
    },
    age: {
        type: Sequelize.INTEGER,
        field: 'age'
    },
    birth_date: {
        type: Sequelize.INTEGER,
        validation: {
            isDate: true
        },
        field: 'birth_date'
    },
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
        field: 'email'
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?$/,
            len: [3, 15]
        },
        field: 'login'
    },
    country: {
        type: Sequelize.STRING(25),
        field: 'country'
    },
    country_code: {
        type: Sequelize.STRING(2),
        field: 'country_code'
    },
    city: {
        type: Sequelize.STRING(30),
        field: 'city'
    },
    phone: {
        type: Sequelize.STRING(20),
        unique: true,
        field: 'phone'
    },
    gender: {
        type: Sequelize.STRING(1),
        validate: {
            is: /^(f|m)+$/
        },
        field: 'gender'
    },
    area: {
        type: Sequelize.STRING(50),
        validate: {
            is: /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/
        },
        field: 'area'
    },
    role: {
        type: Sequelize.STRING,
        field: 'role'
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

var databaseSync = database.sync();

// TODO: создать несколько фунций для сохранения данных в БД


var saveUsersBasicInfo = (values) => {
    let selectedCountry = _.find(dictionaries.countries, (item) => {
        return item.title === _.trim(values.country);
    });

    let customizedValues = {
        first_name: values.first_name,
        last_name: values.last_name,
        age: (+values.age) ? (+values.age) : null,
        birth_date: _.isDate(new Date(values.birth_date)),
        email: values.email,
        login: values.login.toLowerCase(),
        country: values.country ? _.trim(values.country) : null,
        country_code: selectedCountry ? selectedCountry.code : null,
        city: values.city,
        phone: values.phone ? values.phone.toString() : null,
        gender: values.gender ? values.gender.toLowerCase() : null,
        area: values.area,
        role: values.role
    };

    return databaseSync.then(
        () => {
            return User.create(customizedValues)
        }
    );
};

var saveAdditionalInfo = (userId, values) => {
    return saveUsersBasicInfo().then(
        (data) => {
            return User.update(
                values,
                {
                    where: {
                        id: userId
                    }
                }
            );
        }
    );
};



module.exports = {
    saveUsersBasicInfo,

};
