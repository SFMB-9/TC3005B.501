import User from "../../models/user";
import dbConnect from "../../config/dbConnect";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { _name, email, password, _role } = req.body;

    const currentPassword = await User.findOne({ email: email }).password;

    if (currentPassword === password) {
      return res
        .status(400)
        .json({ message: "New password must be different" });
    }

    await User.updateOne({ email: email }, { $set: { password: password } });

    res.status(200).json({ message: "Password updated successfully" });
  }
}
