const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const Categoria = sequelize.define('Categoria',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        nome_categoria:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
        },

    },

    {
        tableName:'Categoria',
        timestamps: true,
        underscored: true,
    },
);

module.exports = Categoria;