const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaisSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    players:{
        type: String,
        required: true
    },
    coach:{
        type: String,
        required: true
    }
});

// nombre de la coleccion en nuestra base de datos
module.exports = mongoose.model('pais', PaisSchema);  