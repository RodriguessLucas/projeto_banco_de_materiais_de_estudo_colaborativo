const express = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');
const autenticar = require('../middleware/autenticacao');

const UsuarioController = require('../controller/UsuarioController');
const AutenticacaoController = require('../controller/AutenticacaoController');
const MaterialController = require('../controller/MaterialController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/cadastrarUsuario', UsuarioController.criar);
routes.post('/login', AutenticacaoController.login);
routes.post('/usuario/cadastrarMateriais', upload.single('arquivo'), MaterialController.criar);

routes.get('/usuarios/perfil', autenticar, UsuarioController.meuPerfil);

module.exports = routes;






