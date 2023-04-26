import mongoose from 'mongoose';
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');


const handler = async (req, res) => {
    // Receive details of the purchase and manager ID
    const {documentos_url, auto, usuario_final_id, chat, vendedor_id } = req.body;

    // Connect to the MongoDB database using Mongoose
    await dbConnect();

    try {
        // Create the purchase
        await Proceso.create({
            documentos_url: documentos_url,
            auto: auto,
            usuario_final_id: usuario_final_id,
            vendedor_id: vendedor_id,
            chat_id: chat,
            tipo_proceso: "venta",
        });

        // Respond with a success message
        res.status(200).json({ message: 'Compra creada'})
    } catch (error) {
        console.error(error);
        // Respond with an error message
        res.status(500).json({ message: 'Hubo un error al crear la compra' });
    } finally {
        // Close the Mongoose connection
        await mongoose.disconnect();
    }
};

export default handler;

