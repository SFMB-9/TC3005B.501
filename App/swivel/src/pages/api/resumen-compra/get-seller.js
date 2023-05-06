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
      const { vendedorId } = req.query; 

      if (!vendedorId) {
        return res.status(400).json({ error: "Missing Vendedor ID" });
      }

      const { db } = await connectToDatabase();

      const vendedor = await db
        .collection("vendedor")
        .findOne({ vendedor_id: ObjectId(vendedorId) });

      // Add proceso de venta, keyed to Processo ID

      if (!vendedor_id) {
        return res.status(404).json({ error: "Vendedor not found" });
      }

      res.status(200).json(vendedor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  res.status(404).json({ message: "Invalid request method" });
}
