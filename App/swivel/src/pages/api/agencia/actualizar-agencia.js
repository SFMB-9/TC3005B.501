import connectToDatabase from '@/utils/mongodb'
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const client = await connectToDatabase;
    const db = client.db("test");
    const userCollection = db.collection('usuarios');

    const { 
        id, 
        documentos,
        horas_min,
        horas_max,
        dias_anticipo,
        dias_max } = req.body;

    try {
      userCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { documentos_requeridos_compra: documentos, 
                  horas_min: horas_min, 
                  horas_max: horas_max,
                  dias_anticipo: dias_anticipo,
                  dias_max: dias_max } 
        }
      );

      res.status(200).json({ message: "Agency updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Wrong request method" });
  }
}