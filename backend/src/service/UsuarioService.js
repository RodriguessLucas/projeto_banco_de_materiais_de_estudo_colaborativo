const Usuario = require("../model/Usuario");
const Material = require("../model/Material");
const bcrypt = require("bcryptjs");

class UsuarioService {
  async criarUsuario(dadosUsuario) {
    const { login, senha } = dadosUsuario;

    const usuarioExiste = await Usuario.findOne({ where: { login } });
    if (usuarioExiste) {
      throw new Error("Email em uso!");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      ...dadosUsuario,
      senha: senhaHash,
    });

    novoUsuario.senha = undefined;
    return novoUsuario;
  }
  async obterPerfilLogado(id_usuario) {
    const usuario = await Usuario.findByPk(id_usuario, {
      attributes: ["id_usuario", "nome", "login", "qntd_estrelas"],
      include: [
        {
          model: Material,
          as: "materiais_criados",
          attributes: ["id", "nome_material"],
        },
      ],
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    return usuario;
  }
}

module.exports = new UsuarioService();
