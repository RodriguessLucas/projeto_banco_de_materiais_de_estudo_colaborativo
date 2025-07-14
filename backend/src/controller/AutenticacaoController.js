const { Model } = require('sequelize');
const AutenticacaoService = require('../service/AutenticacaoService');

class AutenticacaoController{

    async login(req, res){
        try{
            const {login, senha} = req.body;
            console.log(login);
            console.log(senha);
            console.log(await AutenticacaoService.login(login,senha));
            const resultado = await AutenticacaoService.login(login,senha);
            console.log(resultado);

            return res.status(200).json(resultado);
        }
        catch(error){
            console.log("deu erro na controller");
            return res.status(401).json({message: error.message});
        }

    }
}

module.exports = new AutenticacaoController();