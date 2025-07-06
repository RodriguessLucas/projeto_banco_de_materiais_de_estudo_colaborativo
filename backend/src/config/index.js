const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../model/Usuario');
const Categoria = require ('../model/Categoria');
const Materia = require ('../model/Materia');
const Material = require ('../model/Material');

const conexao = new Sequelize(dbConfig);

Usuario.init(conexao);
Categoria.init(conexao);
Materia.init(conexao);
Material.init(conexao);

// relaão categoria/materia feita
Categoria.hasMany(Materia,
    {
        foreignKey: 'id_categoria',
        as : 'materias_relacionadas'
    }
);

Materia.belongsTo(Categoria, 
    {
        foreignKey: 'id_categoria',
        as: 'categoria',
    }
);

// falta relação materia/material 
// falta relação usuario material

