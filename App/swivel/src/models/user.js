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
  { collection: "users" }
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

  url_agencia: String,
  coordenadas_agencia: {
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
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

  legal: {
    nombres: String,
    apellidos: String,
    email: String,
    numero_telefonico: String
  },

  url_grupo_automotriz: String,
  rfc_grupo_automotriz: String,
});

const sellerSchema = new mongoose.Schema({
  agencia_id: String, //si-auto  
  contar_ventas_en_proceso: Number,
  contar_ventas_completas: Number,
});

const managerSchema = new mongoose.Schema({
  agencia_id: String,
  grupo_automotriz_id: String, //si-auto
});

const adminSchema = new mongoose.Schema({
  grupo_automotriz_id: String, //si-auto
});

const superadminSchema = new mongoose.Schema({

  foo: String
  
})

const BuyerUser = User.discriminators && User.discriminators.BuyerUser 
                  ? User.discriminators.BuyerUser 
                  : User.discriminator("BuyerUser", buyerSchema);

const SellerUser = User.discriminators && User.discriminators.SellerUser 
                  ? User.discriminators.SellerUser 
                  : User.discriminator("SellerUser", sellerSchema);

const ManagerUser = User.discriminators && User.discriminators.ManagerUser 
                  ? User.discriminators.ManagerUser 
                  : User.discriminator("ManagerUser", managerSchema);

const AdminUser = User.discriminators && User.discriminators.AdminUser 
                  ? User.discriminators.AdminUser 
                  : User.discriminator("AdminUser", adminSchema);

const AgencyEntity = User.discriminators && User.discriminators.AgencyEntity 
                  ? User.discriminators.AgencyEntity 
                  : User.discriminator("AgencyEntity", agencySchema);

const GaEntity = User.discriminators && User.discriminators.GaEntity 
                  ? User.discriminators.GaEntity 
                  : User.discriminator("GaEntity", gaSchema);

const SaEntity = User.discriminators && User.discriminators.SaEntity
                 ? User.discriminators.SaEntity
                : User.discriminator('SaEntity', superadminSchema);

export { User, AdminUser, SellerUser, ManagerUser, BuyerUser, AgencyEntity, GaEntity, SaEntity };
