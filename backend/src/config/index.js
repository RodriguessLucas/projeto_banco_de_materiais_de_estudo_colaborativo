const Sequelize = require('sequelize');
const dbConfig = require('./database/database.js');

const Usuario = require('../model/Usuario');
const Categoria = require ('../model/Categoria');
const Materia = require ('../model/Materia');
const Material = require ('../model/Material');

const conexao = new Sequelize(dbConfig);

Usuario.init(conexao);
Categoria.init(conexao);
Materia.init(conexao);
Material.init(conexao);

Usuario.associate(conexao.models);
Categoria.associate(conexao.models);
Materia.associate(conexao.models);
Material.associate(conexao.models);

module.exports = conexao;
