const { toCadastroRes } = require('../dto/UsuarioDTO');
const Usuario = require('../model/Usuario');
const bcrypt  = require('bcryptjs');

class UsuarioService{

    async criarUsuario(dadosUsuario){
        const{ login, senha} = dadosUsuario;

        const usuarioExiste = await Usuario.findOne({where:{login}});
        if(usuarioExiste){
            throw new Error("Email em uso!");
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = await Usuario.create({
            ...dadosUsuario,
            senha: senhaHash
        });
        
        const usuarioDTO = toCadastroRes(novoUsuario);

        const message = 'Usuário cadastrado com sucesso!';
        return {usuarioDTO, message};

    }

}

module.exports = new UsuarioService();