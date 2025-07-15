const express = require("express");
const UsuarioController = require("../controller/UsuarioController");
const AutenticacaoController = require("../controller/AutenticacaoController");
const autenticar = require('../middleware/autenticacao');


const routes = express.Router();

routes.post("/cadastrarUsuario", UsuarioController.criar);
routes.post("/login", AutenticacaoController.login);

routes.get('/usuarios/perfil', autenticar, UsuarioController.meuPerfil);

module.exports = routes;
