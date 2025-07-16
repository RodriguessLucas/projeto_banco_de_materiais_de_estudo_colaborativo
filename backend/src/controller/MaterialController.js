const MaterialService = require('../service/MaterialService');

class MaterialController{
    async criar(req, res){
        try{
            const idUsuarioAut = req.user.id;

            const dadosParaSalvar = {
                ...req.body,
                id_usuario: idUsuarioAut,
                caminho_arquivo: req.file.filename,
            };
            
            const material = await MaterialService.criarMaterial(dadosParaSalvar);
            return res.status(201).json(material);
        }
        catch(error){
            return res.status(400).join({message: error.message});
        }
    }
}

module.exports = new MaterialController();