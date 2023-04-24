import User from "../../models/user";
import dbConnect from "../../config/dbConnect";

import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"



export default async function handler(req, res) {

    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.role || session.role !== "user") {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    if (req.method === "GET") {
        dbConnect();

        const users = await User.find({}).select("-password -__v");

        res.status(200).json({ users });
    }
}