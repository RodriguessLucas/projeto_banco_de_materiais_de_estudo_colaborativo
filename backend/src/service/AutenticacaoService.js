require('dotenv').config();
const Usuario = require('../model/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

class AutenticacaoService{
    async login(login, senha){

        const usuario = await Usuario.findOne( {where: {login} } );
        if(!usuario){
            console.log("Usuario nao encontrado");
            throw new Error('E-mail ou senha inválido! Tente novamente');
        }

        const senhaCriptografada = await bcrypt.compare(senha, usuario.senha);
        if(!senhaCriptografada){
            console.log("senha n encontrada");
            throw new Error('E-mail ou senha inválido! Tente novamente');
        }

        const token = jwt.sign(
            {id: usuario.id},
            process.env.JWT_SECRET,
            {expiresIn: '4h'}
        );

        usuario.senha = undefined;

        console.log(usuario);
        console.log(token);
        return {usuario, token};

    }

}

module.exports = new AutenticacaoService();