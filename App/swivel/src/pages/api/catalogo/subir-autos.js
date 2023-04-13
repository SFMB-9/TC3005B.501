// posts.js

import connectToDatabase from "../../util/mongodb";

export default async function handler(req, res) {
  const client = await connectToDatabase;
  const db = client.db("nextjs-mongodb-demo");

  let auto = req.body;
  let result = await db.collection("posts").insertOne(auto);
  res.json({ status: 200, data: "Data uploaded succesfully", result: result })


}
