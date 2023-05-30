import { User } from "../../models/user";
import dbConnect from "../../config/dbConnect";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.role || session.role !== "user") {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (req.method === "GET") {
    dbConnect();
    console.log(req.query)

    const userId = req.query.id; 

    try {
      const user = await User.findOne({_id: userId}).select("name"); // cambiar a nombres cuando cambie la BD
      console.log(user)
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ user });

    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
