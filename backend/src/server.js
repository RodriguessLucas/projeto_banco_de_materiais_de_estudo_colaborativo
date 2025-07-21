// No arquivo: src/server.js

require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const sequelize = require('./config');
const routes = require('./routes/routes');
const swaggerOptions = require('./config/swaggerConfig'); 

const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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