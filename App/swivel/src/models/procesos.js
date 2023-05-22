const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const procesoSchema = new mongoose.Schema({
  tipo_proceso: {
    type: String,
  },
  estatus: {
    type: String,
  },
  documentos: {
    type: Array,
  },
  fecha_creacion: {
    type: Date,
  },
  auto: {
    type: JSON,
  },
  usuario_final: {
    type: JSON,
  },
  vendedor: {
    type: JSON,
  },
  agencia: {
    type: JSON,
  },
  cantidad_a_pagar: {
    type: Decimal128,
  },
  fecha_agendada: {
    type: Date,
  },
  chat: {
    type: JSON,
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  }
});


module.exports = mongoose.models.Proceso || mongoose.model('Proceso', procesoSchema, 'procesos'); // pass the collection name explicitlyo;
