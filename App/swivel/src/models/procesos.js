const mongoose = require('mongoose');

mongoose.connection.setMaxListeners(20);

const baseSchema = new mongoose.Schema(
  {
    tipo_proceso: String,
    estatus: String,

    documentos: {
      nombre_documento: String,
      url: String,
      fecha_modificación: Date,
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

    fecha_inicio: Date,
    comentarios: String,
    solicitud_cancelada: Boolean
  },
  { collection: "procesos" }
);

const Proceso = mongoose.models.Proceso || mongoose.model('Proceso', baseSchema);

const ventaSchema = new mongoose.Schema({
  auto: {
    auto_id: String,
    marca: String,
    modelo: String,
    año: String,
    precio: Number,
    array_fotografias_url: Array
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

  numero_telefonico: String,
  grupo_automotriz_id: String,
  grupo_automotriz: String,
  agencia_id: String,
  vendedor_id: String,
  usuario_final_id: String
});

const pruebaSchema = new mongoose.Schema({
  auto: {
    auto_id: String,
    marca: String,
    modelo: String,
    año: String,
    precio: Number,
    array_fotografias_url: Array
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

  numero_telefonico: String,
  grupo_automotriz_id: String,
  grupo_automotriz: String,
  agencia_id: String,
  usuario_final_id: String,
  hora_agendada: Date,
  fecha_agendada: Date
});

const gaSchema = new mongoose.Schema({
  superadmin_id: String,
  grupo_automotriz_id: String,
  grupo_automotriz: String,
  usuario_final_id: String
});

const agencySchema = new mongoose.Schema({
  superadmin_id: String,
  grupo_automotriz_id: String,
  grupo_automotriz: String,
  agencia_id: String,
  numero_telefonico: String,

  direccion_agencia: {
    calle: String,
    numero_exterior: String,
    numero_interior: String,
    ciudad: String,
    estado: String,
    pais: String,
    codigo_postal: String
  }
});

const VentaProceso = Proceso.discriminators && Proceso.discriminators.ventaSchema 
                  ? Proceso.discriminators.VentaProceso 
                  : Proceso.discriminator("VentaProceso", ventaSchema);

const PruebaProceso = Proceso.discriminators && Proceso.discriminators.pruebaSchema 
                  ? Proceso.discriminators.PruebaProceso 
                  : Proceso.discriminator("PruebaProceso", pruebaSchema);

const GaProceso = Proceso.discriminators && Proceso.discriminators.gaSchema 
                  ? Proceso.discriminators.GaProceso 
                  : Proceso.discriminator("GaProceso", gaSchema);

const AgencyProceso = Proceso.discriminators && Proceso.discriminators.agencySchema 
                  ? Proceso.discriminators.AgencyProceso 
                  : Proceso.discriminator("AgencyProceso", agencySchema);

export { Proceso, VentaProceso, PruebaProceso, GaProceso, AgencyProceso };