const express = require('express');
const homeRoute = require('./routes/home');
const keys = require('./config/keys')
// const pais = require('./models/Pais');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();


// CONECCION A MONGODB
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then(console.log("Se conecto Correctamente a MONGODB"))
    .catch(err=>console.log("Se ha producido un error para conectarse a la base de datos."));


// MIDDLEWARE SETUP 
//VIEW ENGINE SETUP
app.set('view engine', 'ejs');

// CONFIGURACIÓN DE CARPETA ESTÁTICA
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// ROUTING 
app.use('/', homeRoute);


// RUNNING SERVER 
const PORT = process.env.PORT || 3000;

// STARTING THE SERVER
app.listen(PORT, ()=>{
    console.log('Esta aplicación se está ejecutando:', PORT);
});
  