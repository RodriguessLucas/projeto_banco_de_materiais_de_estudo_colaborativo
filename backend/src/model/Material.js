const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const Material = sequelize.define('Material',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        id_categoria:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                mode: 'Categoria',
                key: 'id_categoria'
            }
        },

        nome_materia: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
        },

    },

    {
        tableName: 'Materia',
        timestamps: true,
        underscored: true,
    },
);

modeule.exports = Material;