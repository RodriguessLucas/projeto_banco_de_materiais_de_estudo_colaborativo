const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env')});

const express = require('express');

const sequelize = require('./config');
require('./config/index');

const app = express();
app.use(express.json());
const PORT = 5555;


(async () =>{
    try{

        await sequelize.sync({alter:true});

        console.log("Sicronizado com sucesso!");

        app.listen(PORT, () =>{
            console.log(` Servidor rodando em: http://localhost:${PORT}`);
        });
    }
    catch( error){
        console.log("Falha ao sicronizar: " + error);
    };
    
}) ();



