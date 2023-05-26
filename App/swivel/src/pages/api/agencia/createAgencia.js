import mongoose from 'mongoose';
import dbConnect from "../../../config/dbConnect";
const Usuario = require('../../../models/usuarios');
const Proceso = require('../../../models/proceso');


const handler = async (req, res) => {
   
    const { id, agencia } = req.body;

    if(req.method !== 'PUT'){
        return res.status(405).json({message: 'Metodo no permitido'})
    }
    
    // Connect to the MongoDB database using Mongoose
    await dbConnect();

    try {
        // Add GA data to user
        await Usuario.findByIdAndUpdate(id, {agencia});

        // Respond with a success message
        res.status(200).json({ message: 'GA creado'})

        try {
            //missing: add super admin to process
            await Proceso.create({tipo_proceso: "solicitud_GA" })
            res.status(200).json({ message: 'Proceso creado'})
        }
        catch (error) {
            console.error(error);
            // Respond with an error message
            res.status(500).json({ message: 'Hubo un error al crear el proceso' });
        }
    } catch (error) {
        console.error(error);
        // Respond with an error message
        res.status(500).json({ message: 'Hubo un error al crear la compra' });
    }
};

export default handler;

