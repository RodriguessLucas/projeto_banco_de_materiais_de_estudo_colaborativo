const express = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');
const autenticar = require('../middleware/autenticacao');

const UsuarioController = require('../controller/UsuarioController');
const AutenticacaoController = require('../controller/AutenticacaoController');
const MaterialController = require('../controller/MaterialController');
const MateriaController = require('../controller/MateriaController'); 

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/cadastrarUsuario', UsuarioController.criar);
routes.post('/login', AutenticacaoController.login);
routes.post('/usuario/cadastrarMateriais', autenticar, upload.single('arquivo'), MaterialController.criar);
routes.get('/materiais/:id/download', autenticar, MaterialController.download);
routes.get('/materiais', autenticar, MaterialController.listarTodos);
routes.post('/materias', autenticar, MateriaController.encontrarOuCriar);
routes.get('/materiais/:id', autenticar, MaterialController.buscarPorId);


routes.get('/usuarios/perfil', autenticar, UsuarioController.meuPerfil);
routes.put("/usuarios/perfil", autenticar, UsuarioController.atualizarPerfil);

module.exports = routes;







