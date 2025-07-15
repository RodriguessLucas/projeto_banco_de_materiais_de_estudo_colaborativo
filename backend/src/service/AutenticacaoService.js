require('dotenv').config();
const Usuario = require('../model/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const { toLoginRes } = require('../dto/UsuarioDTO');

class AutenticacaoService{
    async login(login, senha){

        const usuario = await Usuario.findOne( {where: {login} } );
        if(!usuario){
            throw new Error('E-mail ou senha inválido! Tente novamente');
        }

        const senhaCriptografada = await bcrypt.compare(senha, usuario.senha);
        if(!senhaCriptografada){
            throw new Error('E-mail ou senha inválido! Tente novamente');
        }

        const token = jwt.sign(
            {id: usuario.id},
            process.env.JWT_SECRET,
            {expiresIn: '4h'}
        );

        usuario.senha = undefined;
        console.log(usuario);
        const usuarioDTO = toLoginRes(usuario);
        console.log(usuarioDTO);

        return {usuarioDTO, token};

    }

}

module.exports = new AutenticacaoService();