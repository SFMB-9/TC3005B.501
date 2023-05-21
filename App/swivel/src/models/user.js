import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";
const { encryptRole } = require('../utils/crypto');

const baseSchema = new mongoose.Schema({
  tipo_usuario: String,
  nombres: String,
  apellidos: String,
  email: String,
  contraseña: String,
  account_provider: String,
  numero_telefonico: String,
  is_account_verified: Boolean,
  email_verification_token: String,
  lista_deseos: Array,
  account_provider: String,
  documentos_url: [{}],

  direccion: {
    calle: String,
    numero_exterior: String,
    numero_interior: String,
    ciudad: String,
    estado: String,
    pais: String,
    codigo_postal: String,
  },
  
  //agency ONLY
  horas_min: Number,
  horas_max: Number,
  dias_anticipo: Number,
  dias_max: Number,
  documentos_requeridos_agencia: {}
});

baseSchema.pre("save", async function (next) {
  if (!this.isModified("contraseña")) {
    next();
  }

  this.contraseña = await bcrypt.hash(this.contraseña, 10);
});

baseSchema.pre("save", async function (next) {
  if (!this.isModified("tipo_usuario")) {
    next();
  }

  this.tipo_usuario = encryptRole(this.tipo_usuario);
});

const User = mongoose.models.User || mongoose.model("User", baseSchema);

const sellerSchema = new mongoose.Schema({
  agencia: String,
  grupo_automotriz: String,
  agencia: String,
  contar_ventas_en_proceso: Number,
  contar_ventas_completas: Number,
  procesos: [String],
});

const managerSchema = new mongoose.Schema({
  agencia: String,
  grupo_automotriz: String,
  agencia: String,
  gerente_id: String,
});

const SellerUser = User.discriminators && User.discriminators.Type
  ? User.discriminators.Type
  : User.discriminator('Type', sellerSchema);

const ManagerUser = User.discriminators && User.discriminators.Type
  ? User.discriminators.Type
  : User.discriminator('Type', managerSchema);

export { User, SellerUser, ManagerUser };
