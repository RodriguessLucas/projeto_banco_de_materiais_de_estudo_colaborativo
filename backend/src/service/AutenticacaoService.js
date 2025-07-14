const Usuario = require('../model/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

class AutenticacaoService{
    async login(email, senha){

        const usuario = await Usuario.findOne( {where: {email} } );
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

        return {usuario, token};

    }

}

module.exports = new AutenticacaoService();