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
    rol_encriptado: {
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
    documentos_url: {
        url: String,
        fecha_modificacion: Date,
        estatus: String,
        comentarios: String
    },
    direccion: {
        calle: String,
        numero_exterior: String,
        numero_interior: String,
        ciudad: String,
        estado: String,
        pais: String,
        codigo_postal: String
    },
    //_id: mongoose.Schema.Types.ObjectId,
}); 

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema, 'usuarios'); // pass the collection name explicitly
