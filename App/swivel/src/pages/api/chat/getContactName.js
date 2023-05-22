
import { User } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  if (req.method === "GET") {
    dbConnect();

    const id = req.query.id;
    const user = await User.findOne({_id: id}).select('name surname');

    res.status(200).json(user);
  }
}
