import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const autoGroupSchema = new mongoose.Schema({
  name: String,
  postal_code: String,
  email: String,
  street: String,
  ext_number: String,
  state: String,
  city: String,
  password: String,
  encrypted_role: String,
  verified: Boolean,
  token: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.AutoGroup || mongoose.model("AutoGroup", autoGroupSchema);