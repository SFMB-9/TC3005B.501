/**
@catlikeflyer

@description
Este archivo contiene la lógica para obtener el resumen de la compra.
C_015.3

Mandar dentro del query el id del auto relacionado al proceso de venta

*** Revisar con DB si el campo de documentos_id es un array de varios arrays o como anda

 */

import { connectToDatabase } from "@/utils/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { docsId } = req.query; 

      if (!docsId) {
        return res.status(400).json({ error: "Missing docs ID" });
      }

      const { db } = await connectToDatabase();

      const docs = await db
        .collection("documentos")
        .findOne({ documentos_id: ObjectId(userId) });

      // Add proceso de venta, keyed to Processo ID

      if (!proceso_venta) {
        return res.status(404).json({ error: "Docs not found" });
      }

      client.close();

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  res.status(404).json({ message: "Invalid request method" });
}
