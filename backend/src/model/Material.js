const { Model, DataTypes } = require('sequelize');

class Material extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: 
                {
                    model: 'usuarios',
                    key: 'id_usuario',
                }
            },

            id_materia: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'materias',
                    key: 'id',
                }
            },

            nome_material: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'generico',
            },
            
            nome_professor: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'generico',
            },

            descricao_material : {
                type: DataTypes.STRING,
            },

            qntd_estrela: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },

            caminho_arquivo: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {   
            sequelize,
            tableName: 'materiais',
            timestamps: true,
            underscored: true,
        })
    }
    static associate(models){
        this.belongsTo(models.Materia, {
            foreignKey: 'id_materia',
            as: 'materia'
        }),
        this.belongsTo(models.Usuario,{
            foreignKey: 'id_usuario',
            as: 'usuario'
        })
    }
}

module.exports = Material;