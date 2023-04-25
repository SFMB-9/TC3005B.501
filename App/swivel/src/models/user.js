import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: String,
  last_name: String,
  email: String,
  cellphone: String,
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

export default mongoose.models.User || mongoose.model("User", userSchema);