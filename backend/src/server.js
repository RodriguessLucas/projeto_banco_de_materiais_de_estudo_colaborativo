// No arquivo: src/server.js

require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors'); // Importa o pacote cors

const sequelize = require('./config');
const routes = require('./routes/routes');
const swaggerOptions = require('./config/swaggerConfig');

const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());

// --- INÍCIO DA CONFIGURAÇÃO DE CORS PROFISSIONAL ---

// 1. Defina sua lista de origens permitidas (Whitelist)
const allowedOrigins = [
  'http://127.0.0.1:5500',          // Sua origem de desenvolvimento (Live Server)
  'http://localhost:5555',           // Variação comum do Live Server
  'https://SEU-USUARIO.github.io' // <<< IMPORTANTE: Troque pela sua URL do GitHub Pages
];

// 2. Crie as opções do CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Verifica se a origem da requisição está na nossa lista de permitidas
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Permite a requisição se a origem estiver na lista (ou se a requisição não tiver origem, como Postman/Insomnia)
      callback(null, true);
    } else {
      // Bloqueia a requisição se a origem não estiver na lista
      callback(new Error('A política de CORS não permite acesso desta origem.'));
    }
  }
};

// 3. Use o middleware do CORS com as opções configuradas
//    Isso deve vir ANTES da definição das suas rotas
app.use(cors(corsOptions));

// --- FIM DA CONFIGURAÇÃO DE CORS ---

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Suas rotas devem vir DEPOIS da configuração do CORS
app.use(routes);

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(" Tabelas sincronizadas com o banco de dados.");

    app.listen(PORT, () => {
      console.log(` Servidor rodando em: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao sincronizar ou iniciar o servidor:", error);
  }
})();