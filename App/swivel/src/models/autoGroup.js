import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const autoGroupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  encrypted_role: String,
  verified: Boolean,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.AutoGroup || mongoose.model("AutoGroup", autoGroupSchema);