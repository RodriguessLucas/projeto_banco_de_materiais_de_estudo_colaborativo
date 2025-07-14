const express = require('express');
const UsuarioController = require('../controller/UsuarioController');
const routes = express.Router();


routes.post('/cadastrarUsuario', UsuarioController.criar);

module.exports = routes;