import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

mongoose.connection.setMaxListeners(20);

const baseSchema = new mongoose.Schema(
  {
    tipo_usuario: String,
    nombres: String,
    apellidos: String,
    email: String,
    password: String,
    numero_telefonico: String,
  },
  { collection: "usuarios" }
);

baseSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.models.User || mongoose.model("User", baseSchema);

const buyerSchema = new mongoose.Schema({
  account_provider: String, 
  email_verification_token: String,
  lista_deseos: Array,
  documentos: Array,

  //registro-direccion
  direccion: {
    calle: String,
    numero_exterior: String,
    numero_interior: String,
    ciudad: String,
    estado: String,
    pais: String,
    codigo_postal: String,
  },
});

const agencySchema = new mongoose.Schema({
  is_account_verified: Boolean,
  documentos_requeridos_compra: Array,
  horas_min: Number,
  horas_max: Number,
  dias_anticipo: Number,
  dias_max: Number,
  grupo_automotriz_id: String,

  //registro-direccion
  direccion: {
    calle: String,
    numero_exterior: String,
    numero_interior: String,
    ciudad: String,
    estado: String,
    pais: String,
    codigo_postal: String,
  },
});

const gaSchema = new mongoose.Schema({
  is_account_verified: Boolean,

  //registro-direccion
  direccion: {
    calle: String,
    numero_exterior: String,
    numero_interior: String,
    ciudad: String,
    estado: String,
    pais: String,
    codigo_postal: String,
  },
});

const sellerSchema = new mongoose.Schema({
  agencia_id: String, //si-auto  
  contar_ventas_en_proceso: Number,
  contar_ventas_completas: Number,
});

const managerSchema = new mongoose.Schema({
  grupo_automotriz_id: String, //si-auto
});

const BuyerUser =
  User.discriminators && User.discriminators.Type
    ? User.discriminators.Type
    : User.discriminator("Type", buyerSchema);

const SellerUser =
  User.discriminators && User.discriminators.Type
    ? User.discriminators.Type
    : User.discriminator("Type", sellerSchema);

const ManagerUser =
  User.discriminators && User.discriminators.Type
    ? User.discriminators.Type
    : User.discriminator("Type", managerSchema);

const AgencyEntity =
  User.discriminators && User.discriminators.Type
    ? User.discriminators.Type
    : User.discriminator("Type", agencySchema);

const GaEntity =
  User.discriminators && User.discriminators.Type
    ? User.discriminators.Type
    : User.discriminator("Type", gaSchema);

export { User, SellerUser, ManagerUser, BuyerUser, AgencyEntity, GaEntity };

// import mongoose, { model } from "mongoose";
// import bcrypt from "bcryptjs";
// const { encryptRole } = require('../utils/crypto');

// const baseSchema = new mongoose.Schema({
//   tipo_usuario: String,
//   nombres: String,
//   apellidos: String,
//   email: String,
//   contraseña: String,
//   account_provider: String,
//   numero_telefonico: String,
//   is_account_verified: Boolean,
//   email_verification_token: String,
//   lista_deseos: Array,
//   account_provider: String,
//   documentos_url: [{}],

//   direccion: {
//     calle: String,
//     numero_exterior: String,
//     numero_interior: String,
//     ciudad: String,
//     estado: String,
//     pais: String,
//     codigo_postal: String,
//   },

//   //agency ONLY
//   horas_min: Number,
//   horas_max: Number,
//   dias_anticipo: Number,
//   dias_max: Number,
//   documentos_requeridos_agencia: {}
// });

// baseSchema.pre("save", async function (next) {
//   if (!this.isModified("contraseña")) {
//     next();
//   }

//   this.contraseña = await bcrypt.hash(this.contraseña, 10);
// });

// const User = mongoose.models.User || mongoose.model("User", baseSchema);

// const sellerSchema = new mongoose.Schema({
//   agencia: String,
//   grupo_automotriz: String,
//   agencia: String,
//   contar_ventas_en_proceso: Number,
//   contar_ventas_completas: Number,
//   procesos: [String],
// });

// const managerSchema = new mongoose.Schema({
//   agencia: String,
//   grupo_automotriz: String,
//   agencia: String,
//   gerente_id: String,
// });

// const SellerUser = User.discriminators && User.discriminators.Type
//   ? User.discriminators.Type
//   : User.discriminator('Type', sellerSchema);

// const ManagerUser = User.discriminators && User.discriminators.Type
//   ? User.discriminators.Type
//   : User.discriminator('Type', managerSchema);

// export { User, SellerUser, ManagerUser };
