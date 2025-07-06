const {sequelize, Sequelize} = require('sequelize');

const sequelize = new Sequelize('','admbanco', 'admbanco',{
    host:'',
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;