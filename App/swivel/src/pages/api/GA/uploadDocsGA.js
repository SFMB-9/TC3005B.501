import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');


export default async (req, res) => {
   
    const id = req.body._id;
    const documentos = req.body.documentos;

    if(req.method !== 'PUT'){
        return res.status(405).json({message: 'Metodo no permitido'})
    }
 
    // Connect to the MongoDB database using Mongoose
    dbConnect();

    try {
        const docs = await Proceso.findById(id);
        if (!docs) {
            return res.status(404).json({ message: 'No se encontro el usuario' });
        }
        
        docs.documentos = documentos;
        docs.save();

        return res.status(200).json({ message: 'Documentos actualizados' });

    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar los documentos' });
    }

};