/**
@catlikeflyer

@description
Este archivo contiene la lógica para obtener el resumen de la compra.
C_015.2

Mandar dentro del query el id del auto relacionado al proceso de venta

 */

import { connectToDatabase } from "@/utils/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { autoId } = req.query; // Change user ID to get it from auth session

      if (!autoId) {
        return res.status(400).json({ error: "Missing car ID" });
      }

      const { db } = await connectToDatabase();

      const auto = await db
        .collection("automovil")
        .findOne({ auto_id: ObjectId(autoId) });

      // Add proceso de venta, keyed to Processo ID

      if (!auto) {
        return res.status(404).json({ error: "Car not found" });
      }


      res.status(200).json(car);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  res.status(404).json({ message: "Invalid request method" });
}
