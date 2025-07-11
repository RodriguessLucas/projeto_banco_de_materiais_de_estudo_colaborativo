const Usuario = require('../model/Usuario');
const bcrypt  = require('bcryptjs');

class UsuarioService{

    async criarUsuario(dadosUsuario){
        const{ email, senha} = dadosUsuario;

        const usuarioExiste = await Usuario.findOne({where:{email}});
        if(usuarioExiste){
            throw new Error("Email em uso!");
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = await Usuario.create({
            ...dadosUsuario,
            senha: senhaHash
        });

        novoUsuario.senha = undefined;
        return novoUsuario;
    }

}

module.exports = new UsuarioService();