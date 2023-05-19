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
  tipo_proceso: {
    type: String,
  },
  documentos_url: {
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
    auto_id: String,
    marca: String,
    modelo: String,
    ano: String,
    precio: String,
    array_fotografias_url: [String]
  },
  fecha_inicio: {
    type: Date,
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
  }
  //_id: mongoose.Schema.Types.ObjectId,
}); 


module.exports = mongoose.models.Proceso || mongoose.model('Proceso', procesoSchema, 'procesos'); // pass the collection name explicitlyo;
