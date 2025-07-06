const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const Material = sequelize.define('Material',
    {
        id_materia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 
            {
                model: 'Usuario',
                key: 'id',
            }
        },

        id_materia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Materia',
                key: 'id_materia',
            }
        },

        nome_material: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'generico',
        },

        descricao_material : {
            type: DataTypes.STRING,
        },

        qntd_estrela: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

        caminho_arquivo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        tableName: 'Material',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Material;