const express = require('express');
const UsuarioController = require('../controller/UsuarioController');
const AutenticacaoController = require('../controller/AutenticacaoController');
const routes = express.Router();


routes.post('/cadastrarUsuario', UsuarioController.criar);

routes.post('/login', AutenticacaoController.login);

module.exports = routes;