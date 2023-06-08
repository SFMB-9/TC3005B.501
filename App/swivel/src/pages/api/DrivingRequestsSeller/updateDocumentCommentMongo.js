import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await connectToDatabase;
    const db = client.db("test");
    const procesos = await db.collection("procesos");
    
    const process_id = req.body._id;
    const comment = req.body.comment;
    const doc_id = req.body.doc_id;

    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Metodo no permitido' })
    }

    try {
        const proc = await procesos.findOne({ _id: new ObjectId(process_id)});
        if (!proc) {
            return res.status(404).json({ message: 'No se encontro el proceso' });
        }
        const doc = proc.documentos;
        doc[doc_id].comentarios = comment;
        
        const result = await procesos.updateOne({ _id: new ObjectId(process_id)}, { $set: { documentos: doc } });

        return res.status(200).json({ message: 'added comment: ' + comment + ' in request: ' + process_id + ' at document: ' + doc[doc_id].nombre_documento});

    }catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }


}