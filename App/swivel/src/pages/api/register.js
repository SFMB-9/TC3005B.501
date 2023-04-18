import User from "../../models/user";
import dbConnect from "../../config/dbConnect";

import { encryptRole } from "../../utils/crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const { name, email, password, role } = req.body;
    const encrypted_role = encryptRole(role);
    const user = await User.create({ name, email, password, encrypted_role});

    res.status(201).json({ user });
  }
}