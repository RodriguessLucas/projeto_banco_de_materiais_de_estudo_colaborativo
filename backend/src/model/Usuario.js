const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const Usuario = sequelize.define('Usuario',
    {
        id: {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        login : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        senha : {
            type: DataTypes.STRING,
            allowNull: false,
        },

        qntd_estrelas : {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },

    {
        tableName: 'Usuario',
        timestamps: true,
        underscored: true,
    }
);

modeule.exports = Usuario;