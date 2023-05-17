import { User, SellerUser } from "../../models/user";
import dbConnect from "../../config/dbConnect";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { email, password, oldPassword } = req.body;
    const current_user = await User.findOne({ email: email });
    const current_password = current_user.password;
    const hashed_password = await bcrypt.hash(password, 10);

    const isNewOldPasswordMatched = await bcrypt.compare(
      password,
      current_password
    );

    const isOldPasswordMatched = await bcrypt.compare(
      oldPassword,
      current_password
    );

    if (!isOldPasswordMatched) {
      return res.status(400).json({ message: "Wrong Current Password" });
    }
    if (isNewOldPasswordMatched) {
      return res
        .status(400)
        .json({ message: "New password must be different" });
    }

    await User.updateOne(
      { email: email },
      { $set: { password: hashed_password } }
    );

    res.status(200).json({ message: "Password updated successfully" });
  }
}
