const multer = require('multer');
const MaterialService = require('../service/MaterialService');

class MaterialController{
    async criar(req, res){
        try{
            const idUsuarioAut = req.userId; 

            const dadosDoBody = {
                ...req.body,
                id_materia: parseInt(req.body.id_materia, 10),
            };

            const dadosParaSalvar = {
                ...req.body,
                id_usuario: idUsuarioAut,
                caminho_arquivo: req.file.filename,
                mimetype: req.file.mimetype,
            };
            
            const material = await MaterialService.criarMaterial(dadosParaSalvar);
            return res.status(201).json(material);
        }
        catch(error){
            if(error instanceof multer.MulterError){
                return res.status(400).json({message:`Erro no upload do arquivo: ${error.message}`});
            }
            return res.status(400).json({message: error.message});
        }
    }

    async listarTodos(req, res) {
        try {
            const materiais = await MaterialService.listarTodos();
            return res.status(200).json(materiais);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const material = await MaterialService.buscarPorId(id);
            return res.status(200).json(material);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    async download(req, res) {
        try {
        const { id } = req.params;

        const caminhoDoArquivo = await MaterialService.obterCaminhoMaterial(id);
        
        return res.download(caminhoDoArquivo);

        } catch (error) {
        return res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new MaterialController();