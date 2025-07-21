const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
  static init(sequelize) {
    super.init({
        id_usuario:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qntd_estrelas: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, 
    {
        sequelize,
        tableName: 'usuarios',
        timestamps: true,
        underscored: true, 
        id:false
    });
  }

    static associate(models) {
        this.hasMany(models.Material, {
            foreignKey: 'id_usuario',
            as: 'materiais_criados'
        }
    );
  }
}

module.exports = Usuario;