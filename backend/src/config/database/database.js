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

// Esta variável (DATABASE_URL) é fornecida automaticamente pelo Render.
// O 'if' verifica se estamos no ambiente do Render.
if (process.env.DATABASE_URL) {
  // Se estivermos no Render, usamos a DATABASE_URL.
  // CORREÇÃO: Vamos extrair as partes da URL manualmente para garantir a conexão.
  const dbUrl = new URL(process.env.DATABASE_URL);

  dbConfig = {
    ...baseConfig,
    host: dbUrl.hostname,
    port: dbUrl.port,
    database: dbUrl.pathname.substring(1), // Remove a barra inicial do nome do banco
    username: dbUrl.username,
    password: dbUrl.password,
    // As opções de SSL são OBRIGATÓRIAS para a conexão segura no Render.
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Essencial para a conexão no Render
      },
    },
  };
} else {
  // Se a DATABASE_URL não existir, significa que estamos no ambiente local.
  // Neste caso, usamos as variáveis do seu ficheiro .env.
  dbConfig = {
    ...baseConfig,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
}

module.exports = dbConfig;
