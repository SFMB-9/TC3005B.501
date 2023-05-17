/**
@catlikeflyer

@description
 */
import { connectToDatabase } from "@/utils/mongodb";

export default async function handler(req, res) {
  if (req.method === "UPDATE") {
    try {
      const { docId, procesoId, url } = req.body; // Change user ID to get it from auth session
      if (!docId || !procesoId || !url) {
        return res.status(400).json({ error: "Missing queries" });
      }

      const { db } = await connectToDatabase();

      const file_update = await db.collection("procesos").updateOne(
        {
          proceso_id: ObjectId(procesoId),
          "documentos.id": docId,
        },
        {
          $set: { "documentos.$.url": url },
        }
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
