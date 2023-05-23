
import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await connectToDatabase;
    const db = client.db("test");

    if (req.method === "GET") {
        try {
          // Find process by id
          let result = await db.collection("procesos").findOne({ _id: new ObjectId(req.query.process_id) });

    
          if (!result) {
            return res.status(500).json({ message: "Error al buscar proceso" });
          }
    
          // Return list of matching cars and updated filters
          return res
            .status(200)
            .json({
              message: "Proceso recuperado exitosamente",
              result: result
            });
        } catch (err) {
          return res
            .status(400)
            .json({ message: "Error al buscar proceso", error: err.message });
        }
      }
}