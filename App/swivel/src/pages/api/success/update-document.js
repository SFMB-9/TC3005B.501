import mongoose from "mongoose";
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

export default async function handler(req, res) {

    console.log(req.query);
    const process_id = req.query.process_id;

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
        //get the documents of the process

        proc.estatus = 'Pagado';
        proc.markModified('compra');
        //save the changes
        await proc.save();
        return res.status(200).json({ message: 'Updated process status: ' + process_id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }finally {
        mongoose.disconnect();
        console.log("Desconectado de MongoDB");
    }
};