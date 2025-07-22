// Este é o conteúdo para o seu arquivo: backend/src/config/database.js

require('dotenv').config();

// Configuração base que será usada em ambos os ambientes
const baseConfig = {
  dialect: 'postgres', // Define o dialect aqui para garantir que nunca falte
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
};

let dbConfig;

// Verifica se está no ambiente de produção (Render) que fornece a DATABASE_URL
if (process.env.DATABASE_URL) {
  dbConfig = {
    ...baseConfig,
    // Adiciona as opções de SSL necessárias para o Render
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Essencial para a conexão no Render
      },
    },
  };
  // O Sequelize vai usar a DATABASE_URL automaticamente se ela estiver no ambiente
} else {
  // Configuração para o ambiente local (docker-compose)
  dbConfig = {
    ...baseConfig,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
}

module.exports = dbConfig;
