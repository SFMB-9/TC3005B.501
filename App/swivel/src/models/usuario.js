const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    nombre_documento: String,
    url: String,
    fecha_modificacion: Date,
    estatus: String,
    comentarios: String
});

const usuarioSchema = new mongoose.Schema({
    rol_encriptado: {
        type: String,
    },
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
    direccion: {
        calle: String,
        numero_exterior: String,
        numero_interior: String,
        ciudad: String,
        estado: String,
        pais: String,
        codigo_postal: String
    },
    numero_telefonico: {
        type: String,
    },
    grupo_automotriz: {
        type: String
    },
    agencia: {
        type: String
    },
    agencia_id: {
        type: String,
    },
    gerente_id: {
        type: String,
    },
    contar_ventas_en_proceso: {
        type: Number,
    },
    contar_ventas_completas: {
        type: Number,
    },
    lista_deseos: {
        type: [String],
    },
    is_account_verified: {
        type: Boolean,
    },
    email_verification_token: {
        type: String,
    },
    documentos_url: {
        type: [documentSchema],
    },
    procesos: {
        type: [String],
    },
    horas_min: {
        type: Number,
    },
    horas_max: {
        type: Number,
    },
    dias_anticipo: {
        type: Number,
    },
    dias_max: {
        type: Number,
    },
    //_id: mongoose.Schema.Types.ObjectId,
}); 

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema, 'usuarios'); // pass the collection name explicitly
