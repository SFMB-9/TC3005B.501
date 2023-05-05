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
    precio: {
        type: Number,
    },
    array_fotografias_url: {
        type: Array,
    },
    
    _id: mongoose.Schema.Types.ObjectId,
}); 

module.exports = mongoose.models.Auto || mongoose.model('Auto', autoSchema, 'autos'); // pass the collection name explicitly