const { Model, DataTypes } = require('sequelize');

class Categoria extends Model {
    static init(sequelize){
        super.init({
            id_categoria: {
                type: DataTypes.INTEGER,
                primaryKey: true, 
                autoIncrement: true, 
                allowNull: false
            },

            nome_categoria:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }


        },
        {
            sequelize,
            tableName: 'categorias',
            timestamps: true,
            underscored: true,
        }
    
    );

    }
    static associate(models) {
        this.hasMany(models.Materia, {
            foreignKey: 'id_categoria',
            as : 'categorias'
        })
    }

}

module.exports = Categoria;