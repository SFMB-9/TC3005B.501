/**
@catlikeflyer

@description
C_015.4

Actualiza el estado del proceso a confirmado

Es necesario agregar un boton en frontend para triggerear esta funcion
 */

import { connectToDatabase } from "@/utils/mongodb";

export default async function handler(req, res) {
  if (req.method === "UPDATE") {
    try {
      const { procesoId } = req.query;

      if (!procesoId) {
        return res.status(400).json({ error: "Missing proceso ID" });
      }

      const { db } = await connectToDatabase();

      const proceso = await db
        .collection("procesos")
        .updateOne(
          { proceso_id: ObjectId(procesoId) },
          { $set: { estado: "confirmado" } }
        );

      if (!proceso) {
        return res.status(404).json({ error: "Proceso not found" });
      }

      res.status(200).json(proceso);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  res.status(404).json({ message: "Invalid request method" });
}
