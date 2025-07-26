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
routes.post('/usuario/cadastrarMateriais', autenticar, upload.single('arquivo'), MaterialController.criar);
// deu erro aqui, e tem q verificar com testes se da tudo certo, pois ta dando token invalido


routes.get('/usuarios/perfil', autenticar, UsuarioController.meuPerfil);
routes.put("/usuarios/perfil", autenticar, UsuarioController.atualizarPerfil);

routes.get('/materiais/:id/download', autenticar, MaterialController.download);
routes.get('/materiais/buscar', MaterialController.buscar);


module.exports = routes;






