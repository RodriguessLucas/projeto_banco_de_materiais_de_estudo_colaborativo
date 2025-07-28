// No arquivo: src/services/MateriaService.js

const Materia = require('../model/Materia');
const Categoria = require('../model/Categoria'); 

class MateriaService {
  async encontrarOuCriar(dadosMateria) {
    const { nome_materia, nome_categoria } = dadosMateria;

    if (!nome_materia || nome_materia.trim() === '') {
      throw new Error('O nome da matéria é obrigatório.');
    }

    
    const nomeCategoriaFinal = nome_categoria && nome_categoria.trim() !== '' ? nome_categoria : 'Genérico';

    const [categoria] = await Categoria.findOrCreate({
      where: { nome_categoria: nomeCategoriaFinal },
      defaults: { nome_categoria: nomeCategoriaFinal },
    });
 
    const [materia, created] = await Materia.findOrCreate({
      where: {
        nome_materia: nome_materia,
        id_categoria: categoria.id_categoria, 
      },
      defaults: {
        nome_materia: nome_materia,
        id_categoria: categoria.id_categoria,
      },
    });

    return { materia, created };
  }
}

module.exports = new MateriaService();