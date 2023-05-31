import { User, BuyerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    dbConnect();

    const id = req.query.id;
    try {
      await User.deleteOne({ _id: id });
      res.status(200).json({ message: "user account successfully deleted" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  }
}
