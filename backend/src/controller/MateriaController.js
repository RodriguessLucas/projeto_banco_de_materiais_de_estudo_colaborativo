const materiaService = require('../service/MateriaService'); 

class MateriaController {
  
  async encontrarOuCriar(req, res) {
    try {
      const { materia, created } = await materiaService.encontrarOuCriar(req.body);
      const statusCode = created ? 201 : 200; 
      return res.status(statusCode).json(materia);

    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new MateriaController();