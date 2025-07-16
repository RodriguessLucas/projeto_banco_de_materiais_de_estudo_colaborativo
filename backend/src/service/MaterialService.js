const { Model } = require('sequelize');
const Material = require('../model/Material');

class MaterialService{
    async criarMaterial(dados){
        const novoMaterial = await Material.create(dados);
        return novoMaterial;
    }
}

module.exports = new MaterialService();