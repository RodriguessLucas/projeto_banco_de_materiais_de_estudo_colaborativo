const usuarioService = require("../service/UsuarioService");

class UsuarioController {
  async criar(req, res) {
    try {
      const novoUsuario = await usuarioService.criarUsuario(req.body);
      return res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async meuPerfil(req, res) {
    try {
      const perfil = await usuarioService.obterPerfilLogado(req.userId);
      return res.status(200).json(perfil);
    } catch (error) {
      return res.status(404).json({ erro: error.message });
    }
  }
  async atualizarPerfil(req, res) {
    try {
      const perfilAtualizado = await usuarioService.atualizarPerfil(
        req.userId,
        req.body
      );
      return res.status(200).json(perfilAtualizado);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }
  
}

module.exports = new UsuarioController();
