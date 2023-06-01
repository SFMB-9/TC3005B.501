import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";

/**
 * Creates agency from GA page, only for GA users
 * @param {*} req
 * @param {*} res
 * 
 * By @catlikeflyer
 */

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { db } = await connectToDatabase();
    const agency = req.body.agencia;
    const { GAId } = req.query;

    const result = await db
      .collection("usuarios")
      .insertOne({
        ...agency,
        grupo_automotriz_id: GAId,
        agencia_id: new ObjectId(),
      });

    if (!result) {
      res.status(404).json({ message: "Error creating agency" });
      return;
    }

    res.status(200).json({ message: "Agency created successfully" });
  } else {
    res.status(405).json({ message: "Wrong request method" });
  }
}
