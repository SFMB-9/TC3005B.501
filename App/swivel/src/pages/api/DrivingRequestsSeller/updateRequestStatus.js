import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Metodo no permitido' })
  }

  const proceso_id = req.body._id;
  const new_status = req.body.status

  const client = await connectToDatabase;
  const db = client.db("test");
  const processCollection = db.collection('procesos');

  try {
    // Find the processes that belong to the seller and are of a specific type
    const proc = await processCollection.findOne({ _id: new ObjectId(proceso_id) });
    
    if (!proc) {
      return res.status(404).json({ message: 'No se encontro el proceso' });
    }

    if (proc.tipo_proceso === 'solicitudCompra') {
      await processCollection.updateOne({ _id: new ObjectId(proceso_id) }, { $set: { estatus: new_status } });
    } else {
      await processCollection.updateOne({ _id: new ObjectId(proceso_id) }, { $set: { estatus_validacion: new_status } });
    }

    res.status(200).json({ message: 'status of ' + proceso_id + ' updated to ' + new_status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
