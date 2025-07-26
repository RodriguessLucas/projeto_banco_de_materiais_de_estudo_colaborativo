const { Model } = require('sequelize');
const Material = require('../model/Material');
const path = require('path');

class MaterialService{
    async criarMaterial(dados){
        const novoMaterial = await Material.create(dados);
        return novoMaterial;
    }

    async downloadMaterial(id){
        const material = await Material.findByPk(id)

        if(!material){
            throw new Error ('Material não encontrado.')
        }

        const caminhoArquivo = path.resolve(
            './uploads',
            material.caminho_arquivo
        );

        return caminhoArquivo

    }
    async buscarMateriais(palavraChave) {
        const materiais = await Material.findAll({
            where: {
                [Op.or]: [
                    { nome_material: { [Op.iLike]: `%${palavraChave}%` } },
                    { descricao_material: { [Op.iLike]: `%${palavraChave}%` } },
                    { nome_professor: { [Op.iLike]: `%${palavraChave}%` } }
                ]
            }
        });

        return materiais;
    }

}

module.exports = new MaterialService();