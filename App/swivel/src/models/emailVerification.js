import mongoose, { model } from "mongoose";

const EmailVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    expires: '1d', // Automatically delete expired tokens after 1 day
    default: Date.now,
  },
});

export default mongoose.models.EmailVerification || mongoose.model("EmailVerification", EmailVerificationSchema);