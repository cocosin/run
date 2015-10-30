let database = require('database');

let User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    last_name: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER(2)
    },
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: Sequelize.STRING(20),
        unique: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?$/,
            len: [3, 15]
        }
    },
    gender: {
        type: Sequelize.STRING(1),
        validate: {
            is: /^(f|m)+$/
        }
    },
    area: {
        type: Sequelize.STRING(50),
        validate: {
            is: /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/
        }
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});


module.exports = router;
