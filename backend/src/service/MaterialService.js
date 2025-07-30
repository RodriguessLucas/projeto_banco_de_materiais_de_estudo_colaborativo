const { Model } = require('sequelize');
const Material = require('../model/Material');
const Usuario = require('../model/Usuario');
const path = require('path');

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
    async buscarPorId(id) {
        const material = await Material.findByPk(id, {
            include: [{
            model: Usuario,
            as: 'usuario', 
            attributes: ['id_usuario', 'nome']
            }]
        });


        if (!material) {
        throw new Error('Material não encontrado.');
        }
        return material;
    }

    async obterDadosMaterial(id) {
        const material = await Material.findByPk(id);
        if (!material) {
        throw new Error('Material não encontrado.');
        }
        return material;
    }

    async obterCaminhoMaterial(id) {
        const material = await Material.findByPk(id);
        if (!material) {
        throw new Error('Material não encontrado.');
        }

        const caminhoDoArquivo = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            material.caminho_arquivo
        );

        return caminhoDoArquivo;
    }
    
}

module.exports = new MaterialService();