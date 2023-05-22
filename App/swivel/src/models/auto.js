const mongoose = require('mongoose');

const autoSchema = new mongoose.Schema({
    marca: {
        type: String,
    },
    modelo: {
        type: String,
    },
    color: {
        type: String,
    },
    color_interior: {
        type: String,
    },
    pasajeros: {
        type: Number,
    },
    combustible: {
        type: String,
    },
    motor: {
        type: String,
    },
    ano: {
        type: Number,
    },
    transmision: {
        type: String,
    },
    rendimiento: {
        type: Number,
    },
    nombre_agencia: {
        type: String,
    },
    estado_agencia: {
        type: String,
    },
    municipio_agencia: {
        type: String,
    },
    tipo_vehiculo: {
        type: String,
    },
    precio: {
        type: Number,
    },
    array_fotografias_url: {
        type: Array,
    },
    caracteristicas: {
        type: Array,
    },
    extras: {
        type: JSON
    },
    descripcion: {
        type: String,
    },
    _id: mongoose.Schema.Types.ObjectId,
}); 

module.exports = mongoose.models.Auto || mongoose.model('Auto', autoSchema, 'autos'); // pass the collection name explicitly