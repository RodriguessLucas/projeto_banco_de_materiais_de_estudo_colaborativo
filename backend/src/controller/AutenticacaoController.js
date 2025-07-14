const { Model } = require('sequelize');
const AutenticacaoService = require('../service/AutenticacaoService');

class AutenticacaoController{

    async login(req, res){
        try{
            const {login, senha} = req.body;
            const resultado = await AutenticacaoService.login(login,senha);
            return res.status(200).json(resultado);
        }
        catch(error){
            return res.status(401).json({message: error.message});
        }

    }
}

module.exports = new AutenticacaoController();