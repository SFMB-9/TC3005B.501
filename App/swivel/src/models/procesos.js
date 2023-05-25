const mongoose = require('mongoose');

const procesoSchema = new mongoose.Schema({
  nombre_agencia: {
    type: String,
  },
  direccion_agencia: {
    type: String,
  },
  grupo_automotriz_id: {
    type: String,
  },
  grupo_automotriz: {
    type: String,
  },
  superadmin: {
    type: String,
  },
  estatus_validacion: {
    type: String,
  },
  estatus: {
    type: String,
  },
  documentos: {
    type: Array,
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
  auto: {
    type: JSON,
  },
  fecha_creacion: {
    type: Date,
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
    type: Number,
  },
  fecha_agendada: {
    type: Date,
  },
  hora_agendada: {
    type: Date,
  },
  usuario_final_id: {
    type: String,
  },
  numero_telefonico: {
    type: String,
  },
  comentarios: {
    type: String,
  },
  tipo_proceso: {
    type: String,
  }
  //_id: mongoose.Schema.Types.ObjectId,
}); 


module.exports = mongoose.models.Proceso || mongoose.model('Proceso', procesoSchema, 'procesos'); // pass the collection name explicitlyo;
