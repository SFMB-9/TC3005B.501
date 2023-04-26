const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    tipo_usuario: {
    type: String,
   
    },
    nombres: {
    type: String,

    },
    apellidos: {
    type: String,
   
    },
    email: {
    type: String,
   
    },
    contrasena: {
    type: String,
   
    }, 
    gerente_id: {
    type: String,
    },
    contar_ventas_completas: {
    type: Number,
    },
    contar_ventas_en_proceso: {
    type: Number,
    },
    _id: mongoose.Schema.Types.ObjectId,
}); 

const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios'); // pass the collection name explicitly

module.exports = Usuario;