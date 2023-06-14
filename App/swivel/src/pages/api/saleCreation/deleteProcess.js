import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await connectToDatabase;
    const db = client.db("test");
    const procesos = await db.collection("procesos");
    const process_id = req.query.process_id;

    if(req.method !== "DELETE") {
        return res.status(400).json({ message: "Wrong request method" });
    }

    try {
        const query = { "_id": new ObjectId(process_id) };

        const result = await procesos.deleteOne(query);

        return res.status(200).json({ message: "Proceso borrado exitosamente", result: result });

    } catch (error){
        return res.status(500).json({ message: "Error al borrar proceso", error: error });
    }


}