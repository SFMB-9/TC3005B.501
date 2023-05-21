import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";
const { encryptRole } = require('../utils/crypto');

const baseSchema = new mongoose.Schema({
  tipo_usuario: String,                 // universal : role
  nombres: String,                      // universal
  apellidos: String,                    // client/seller/manager
  email: String,                        // universal
  contraseña: String,                   // universal
  account_provider: String,             // client
                                        //
  direccion: {                          // auto group/client
    calle: String,                      //
    numero_exterior: String,            //
    numero_interior: String,            //
    ciudad: String,                     //
    estado: String,                     //
    pais: String,                       //
    codigo_postal: String,              //
  },                                    //
                                        //
  numero_telefonico: String,            // client/seller/manager
  grupo_automotriz: String,             // seller/manager
  agencia: String,                      // seller/manager
  gerente_id: String,                   // manager
  contar_ventas_en_proceso: Number,     // seller
  contar_ventas_completas: Number,      // seller
  is_account_verified: Boolean,         // universal
  email_verification_token: String,     // universal
                                        //
  documentos_url: [{}],                 // universal
                                        //
  procesos: [String],                   // seller
  lista_deseos: Array,                  // client

  account_provider: String,
  
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
  agency: String,
  phone: String,
});

const managerSchema = new mongoose.Schema({
  agency: String,
  phone: String,
});

const SellerUser = User.discriminators && User.discriminators.Type
  ? User.discriminators.Type
  : User.discriminator('Type', sellerSchema);

const ManagerUser = User.discriminators && User.discriminators.Type
  ? User.discriminators.Type
  : User.discriminator('Type', managerSchema);

export { User, SellerUser, ManagerUser };
