/**
@catlikeflyer

@description
Este archivo contiene la lógica para obtener el resumen de la compra.
C_015.1

En la primera conexion jalar todos los keys que contenga proceso_venta. Guardarlos en un state para 
poderlos usar en el componente de resumen de compra completo, sin tener que hacer los calls en cada
pantalla.

Cuando se haga el call se va necesitar hacer el call a varios apis de manera simultanea

 */

import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { userId, procesoId } = req.query; // Change user ID to get it from auth session

      if (!userId || !procesoId) {
        return res.status(400).json({ error: "Missing queries" });
      }

      const { db } = await connectToDatabase();

      const proceso_venta = await db
        .collection("procesos")
        .findOne({ _id: new ObjectId(procesoId) });

      res.status(200).json(proceso_venta);

      // Add proceso de venta, keyed to Processo ID

      if (!proceso_venta) {
        return res.status(404).json({ error: "Proceso not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  res.status(404).json({ message: "Invalid request method" });
}
