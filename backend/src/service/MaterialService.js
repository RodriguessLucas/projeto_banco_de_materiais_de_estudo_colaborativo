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

}

module.exports = new MaterialService();