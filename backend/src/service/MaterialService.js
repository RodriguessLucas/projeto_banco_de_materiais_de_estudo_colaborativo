const { Model } = require('sequelize');
const Material = require('../model/Material');

class MaterialService{
    async criarMaterial(dados){
        const novoMaterial = await Material.create(dados);
        return novoMaterial;
    }
    async listarTodos() {
        try {
            const materiais = await Material.findAll();
            return materiais;
        } catch (error) {
            throw new Error(`Não foi possível buscar os materiais: ${error.message}`);
        }
    }  

    


}

module.exports = new MaterialService();