// Delete a car from the catalog
import { ObjectId } from "mongodb";

import connectToDatabase from "@/utils/mongodb";

export default async function handler(req, res) {
  const client = await connectToDatabase;
  const db = client.db("nextjs-mongodb-demo");

  if (req.method === 'DELETE') {
    try {
      let id_auto = req.query.id_auto;
      let result = await db.
        collection("posts").
        deleteOne({ _id: new ObjectId(id_auto) });


      if (!result) {
        return res.status(500).json({ message: "Error al borrar auto" });
      }

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "No se encontró el auto" });
      } else {
        return res
          .status(200)
          .json({ message: "Auto borrado exitosamente", result: result });
      }
    }
    catch (err) {
      return res.status(400).json({ message: "Error al borrar auto", error: err });
    }
  }
}
