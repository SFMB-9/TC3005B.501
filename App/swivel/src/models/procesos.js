const mongoose = require('mongoose');

mongoose.connection.setMaxListeners(20);

const baseSchema = new mongoose.Schema(
  {
    tipo_proceso: String,
    estatus_validacion: String,

    documentos: Array,

    direccion: {
      calle: String,
      numero_exterior: String,
      numero_interior: String,
      ciudad: String,
      estado: String,
      pais: String,
      codigo_postal: String
    },

    fecha_solicitud: Date,
    comentarios: String,
    solicitud_cancelada: Boolean,
    usuario_ga_id: String,

    auto: {
      auto_id: String,
      marca: String,
      modelo: String,
      año: String,
      precio: Number,
      array_fotografias_url: Array
    },

    numero_telefonico: String,
    grupo_automotriz_id: String,
    grupo_automotriz: String,
    agencia_id: String,
    vendedor_id: String,
    usuario_final_id: String,

    direccion_agencia: {
      calle: String,
      numero_exterior: String,
      numero_interior: String,
      ciudad: String,
      estado: String,
      pais: String,
      codigo_postal: String
    },

    superadmin_id: String,
    fecha_agendada: Date,
    hora_agendada: Date,

    info_GA: {
      nombres: String,
      direccion: {
        calle: String,
        numero_exterior: String,
        numero_interior: String,
        ciudad: String,
        estado: String,
        pais: String,
        codigo_postal: String
      },

      is_account_verified: Boolean,
      url_grupo_automotriz: String,
      rfc_grupo_automotriz: String,

      legal: {
        nombres: String,
        apellidos: String,
        email: String,
        numero_telefonico: String
      }
    }
  },  
  { collection: "procesos" }
);

module.exports = mongoose.models.Proceso || mongoose.model('Proceso', baseSchema);

;