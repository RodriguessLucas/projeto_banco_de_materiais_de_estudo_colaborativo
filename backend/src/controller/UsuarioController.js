const usuarioService = require('../service/UsuarioService');

class UsuarioController{
    async criar(req, res){
        try{
            const novoUsuario = await usuarioService.criarUsuario(req.body);
            return res.status(201).json(novoUsuario);
        }
        catch(error){
            res.status(400).json({message: error.message});
        }
    }

}

module.exports = new UsuarioController();