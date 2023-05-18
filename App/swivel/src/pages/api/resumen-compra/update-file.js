/**
@catlikeflyer

@description
 */
import { connectToDatabase } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import bodyParser from "body-parser";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parsing
  },
};

const jsonParser = bodyParser.json();

export default async function handler(req, res) {
  if (req.method === "UPDATE") {
    try {
      const { docId, procesoId, url } = req.query; // Change user ID to get it from auth session
      if (!docId || !procesoId || !url) {
        return res.status(400).json({ error: "Missing queries" });
      }

      const { db } = await connectToDatabase();

      const file_update = await db.collection("procesos").updateOne(
        { _id: new ObjectId(procesoId) }, // Parent object node filter
        { $set: { "documentos.$url": url } }, // Update operation
        { arrayFilters: [{ "url._id": new ObjectId(docId) }] } // Array filter
      );

      // Add proceso de venta, keyed to Processo ID

      if (!file_update) {
        return res.status(404).json({ error: "Couldn't update file" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  res.status(404).json({ message: "Invalid request method" });
}
