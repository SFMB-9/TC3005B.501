import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  // shared
  name: String,
  email: String,
  password: String,
  encrypted_role: String,
  verified: Boolean,
  token: String,
  // general user only
  last_name: String,
  cellphone: String,
  // auto group only
  postal_code: String,
  street: String,
  ext_number: String,
  state: String,
  city: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.User || mongoose.model("User", userSchema);