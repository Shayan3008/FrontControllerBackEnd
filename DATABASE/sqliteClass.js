const Sequelize = require("sequelize");

class SqlConnection {
    constructor() {
        this.Sequelize = new Sequelize('database', 'username', 'password', {
            dialect: 'sqlite',
            storage: 'database.sqlite'
        });
    }

    connect() {
        this.Sequelize.authenticate()
            .then(() => console.log('Connection to the database has been established successfully.'))
            .catch(err => console.error('Unable to connect to the database:', err));
    }
    categoryTableCreation() {

        this.Sequelize.define('category', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncreement: true,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                null: false,
            }
        })
        this.Sequelize.define('Item', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncreement: true,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                null: false,
            },
            price: {
                type: Sequelize.DataTypes.FLOAT,
                null: false,
            },
            count: {
                type: Sequelize.DataTypes.INTEGER,
                null: false,
            },
            description: {
                type: Sequelize.DataTypes.STRING,
                null: false,
            },
        })

    }
}

module.exports = SqlConnection