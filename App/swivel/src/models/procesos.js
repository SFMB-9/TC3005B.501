const mongoose = require('mongoose');

const procesoSchema = new mongoose.Schema({
  vendedor_id: {
    type: String,
  },
  agencia_id: {
    type: String,
  },
  direccion_agencia: {
    calle: String,
    numero_exterior: String,
    numero_interior: String,
    ciudad: String,
    estado: String,
    pais: String,
    codigo_postal: String
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
    array_fotografias: [String]
  },
  fecha_inicio: {
    type: Date,
  },
  fecha_agendada: {
    type: Date,
  },
  usuario_final_id: {
    type: String,
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


module.exports = mongoose.models.Proceso || mongoose.model('Proceso', procesoSchema, 'procesos'); // pass the collection name explicitlyo;
