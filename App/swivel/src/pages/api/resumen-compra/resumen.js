/**
@catlikeflyer

@description
Este archivo contiene la lógica para obtener el resumen de la compra.
C_015.1
 */

import { connectToDatabase } from "@/utils/mongodb";

export default async function handler(req, res) {
  try {
    const { userId } = req.query; // Change user ID to get it from auth session

    if (!userId) {
      return res.status(400).json({ error: "Missing user ID" });
    }

    const { db } = await connectToDatabase();

    const proceso_venta = await db
      .collection("proceso_venta")
      .findOne({ usuario_final_id: ObjectId(userId) });

    // Add proceso de venta, keyed to Processo ID

    if (!proceso_venta) {
      return res.status(404).json({ error: "User not found" });
    }

    client.close();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
