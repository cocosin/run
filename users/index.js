"use strict";
let Sequelize = require('sequelize'),
    _ = require('lodash'),
    rootpath = require('rootpath')(),
    bcrypt = require('bcryptjs');

let database = require('database'),
    dictionaries = require('dictionaries');

let User = database.define('Users', {
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
    pass_hash: {
        type: Sequelize.STRING,
        allowNull: false,
        set (val) {
            let salt = bcrypt.genSaltSync(10),
                hash = bcrypt.hashSync(val, salt);

            this.setDataValue('pass_hash', hash);
        }
    },
    first_name: {
        type: Sequelize.STRING(20),
        field: 'first_name',
        validate: {
            is: /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/
        }
    },
    last_name: {
        type: Sequelize.STRING(20),
        field: 'last_name'
    },
    age: {
        type: Sequelize.INTEGER,
        field: 'age',
        validate: {
            max: 90,
            min: 13
        }
    },
    birth_date: {
        type: Sequelize.STRING(15),
        allowNull: true,
        validate: {
            //isDate: true,
            //isAfter:  new Date().setFullYear(new Date().getFullYear() - 91),    // only allow date strings after a specific date
            //isBefore: new Date().setFullYear(new Date().getFullYear() - 13)     // only allow date strings before a specific date
        },
        field: 'birth_date'
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

var databaseSync = database.sync(),
    usersMethods = {
        User,
        databaseSync,
        saveUsersInfo (values) {
            let selectedCountry = _.find(dictionaries.countries, (item) => {
                return item.title === _.trim(values.country);
            }),
                selectedCity = _.find(dictionaries.cities, (item) => {
                    return item.title === _.trim(values.city);
                });

            let customizedValues = {
                first_name: values.first_name ? _.capitalize(values.first_name.toLowerCase()) : null,
                last_name: values.last_name ? _.capitalize(values.last_name.toLowerCase()) : null,
                pass_hash: values.pass_hash,
                age: (+values.age) ? (+values.age) : null,
                birth_date: _.isDate(new Date(values.birth_date)) ? values.birth_date : null,
                email: values.email ? values.email.toLowerCase() : null,
                login: values.login.toLowerCase(),
                country: values.country ? _.trim(values.country) : null,
                country_code: selectedCountry ? selectedCountry.code : null, // для удобной работы справочников
                city: selectedCity ? selectedCity.code : null,
                phone: values.phone ? values.phone.toString() : null,
                gender: values.gender ? values.gender.toLowerCase() : null,
                area: values.area,
                role: values.role  // роль в этом сервисе
            };

            return databaseSync.then(
                () => {
                    // после подключения к базе
                    return User.create(customizedValues)
                }
            );
        },
        saveUsersBasicInfo (values) {
            let customizedValues = {
                email: values.email,
                login: values.login,
                pass_hash: values.pass_hash,
                age: values.age,
                country: values.country,
                city: values.city
            };
            this.saveUsersInfo(customizedValues);
        },
        saveAdditionalInfo (userId, values) {
            return this.saveUsersBasicInfo().then(
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
        }
    };


User.findOne(
    {
        where: {
            login: 'qostya'
        },
        attributes: ['id', 'login', 'pass_hash']
    }
).then(
    (data) => {
        console.log(data);
    }
);

/*usersMethods.saveUsersBasicInfo(
    {
        email: "ooo@qq.ru",
        login: 'ooo',
        pass_hash: "1234",
        age: 21,
        country: "RU",
        city: "spb"
    }
);*/

// TODO: создать несколько фунций для сохранения данных в БД



module.exports = usersMethods;
