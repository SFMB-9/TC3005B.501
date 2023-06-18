import { MongoClient } from "mongodb";

import {getSession} from "next-auth";
//import of function that does db connection

export default async (req, res) => {
  const session = await getSession({ req });
  const user = session.get("user");

  if (session) {
    // Signed in
    const { userId } = user;
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const userData = await db.collection("users").findOne({ _id: userId });
    res.status(200).json({ userData });
  } else {
    // Not Signed in
    res.status(400).json({ message: "Invalid Request body" });
  }
};
