const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../model/Usuario');
const Categoria = require ('../model/Categoria');
const Materia = require ('../model/Materia');
const Material = require ('../model/Material');

const conexao = new Sequelize(dbConfig);

Usuario.init(conexao);
Categoria.init(conexao);
Materia.init(conexao);
Material.init(conexao);

// relacão categoria/materia feita
Categoria.hasMany(Materia,
    {
        foreignKey: 'id_categoria',
        as : 'materias'
    }
);

Materia.belongsTo(Categoria, 
    {
        foreignKey: 'id_categoria',
        as: 'materia',
    }
);

//relação materia/material 
Materia.hasMany(Material,
    {
        foreignKey: 'id_materia',
        as: 'materiais'
    }
);

Material.belongsTo(Materia,
    {
        foreignKey: 'id_materia',
        as: 'material',
    }
);


//relação usuario material
Usuario.hasMany(Material ,
    {
        foreignKey: 'id_usuario',
        as: 'materiais_criados'
    }
);

Material.belongsTo(Usuario,
    {
        foreignKey: 'id_usuario',
        as : 'criador'
    }
)
