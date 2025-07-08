const {Model, DataTypes } = require('sequelize');

class Materia extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            id_categoria:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'categorias',
                    key: 'id_categoria'
                }
            },

            nome_materia: {
                type: DataTypes.STRING,
                allowNull:false,
                unique: true,
            },

        },

        {   
            sequelize,
            tableName: 'materias',
            timestamps: true,
            underscored: true,
        }
        )
    }

    static associate(models) {
        this.hasMany(models.Material,
            {
                foreignKey: 'id_materia',
                as: 'materias'
            }
        )

        this.belongsTo(models.Categoria,
            {
                foreignKey: 'id_categoria',
                as: 'categorias'
            }
        )
    }
}


module.exports = Materia;