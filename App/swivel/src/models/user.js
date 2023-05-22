import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

mongoose.connection.setMaxListeners(20); 

const baseSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String,
    password: String,
    encrypted_role: String,
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