import {User} from "../../models/user";
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
    try {
      await dbConnect();
    } catch (error) {
      console.error(`Failed to connect to the database: ${error}`);
      return res.status(500).json({ error: "Server error" });
    }

    let users;
    try {
      users = await User.find({}).select("-password -__v");
    } catch (error) {
      console.error(`Failed to fetch users: ${error}`);
      return res.status(500).json({ error: "Failed to fetch users" });
    }

    return res.status(200).json({ users });
  }
}
