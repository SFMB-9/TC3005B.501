import mongoose from "mongoose";
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

export default async function handler(req, res) {

    console.log(req.query);
    const process_id = req.query.process_id;
    const doc_index = req.query.doc_index;
    const file_url = req.query.file_url;
    const update_date = req.query.update_date;

    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Metodo no permitido' })
    }

    await dbConnect();

    try {
        // Find the process that needs to be updated
        const proc = await Proceso.findById(process_id);
        if (!proc) {
            return res.status(404).json({ message: 'No se encontro el proceso' });
        }
        if (!proc.documentos[doc_index]) {
            return res.status(404).json({ message: 'No se encontro el documento' });
        }
        //get the documents of the process
        const doc = proc.documentos;
        //update comment
        doc[doc_index].url = file_url;
        doc[doc_index].fecha_modificacion = update_date;

        proc.documentos = doc;
        proc.markModified('documentos');
        //save the changes
        await proc.save();
        return res.status(200).json({ message: 'Updated file in request: ' + process_id + ' at document: ' + doc[doc_index].nombre });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }finally {
        mongoose.disconnect();
        console.log("Desconectado de MongoDB");
    }
};