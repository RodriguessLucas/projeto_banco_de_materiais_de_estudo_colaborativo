require('dotenv').config({ path: path.resolve(__dirname, '..', '.env')});


const express = require('express');
const app = express();

app.listen(4444, () =>{
    console.log('servidor rodando: http://localhost:4444');
})