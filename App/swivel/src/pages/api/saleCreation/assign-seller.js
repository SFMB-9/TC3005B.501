import mongoose from "mongoose";
import dbConnect from "../../../config/dbConnect";
const Usuario = require('../../../models/usuario');

export default async function handler(req, res) {
    await dbConnect();

    console.log("Asignando vendedor a compra en endpoint");
    try {
        const resultVendedor = await Usuario
            .find({ "contar_ventas_en_proceso": { $exists: true, $lt: Infinity } })
            .sort({ "contar_ventas_en_proceso": 1 })
            .limit(1, { _id: 0, _id: 1 })
            .lean()
            .exec();

        if (resultVendedor.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const id_vendedor = resultVendedor[0]._id;

        await Usuario.updateOne({ "_id": id_vendedor }, { $inc: { "contar_ventas_en_proceso": 1 } });

        const usuarioVendedor = await Usuario.findById(id_vendedor);
        
        const agenciaVendedor = await Usuario.findById(usuarioVendedor.agencia_id);

        return res.status(200).json({ message: 'Compra asignada correctamente', vendedor: usuarioVendedor, agencia: agenciaVendedor });
    } catch (error) {
        console.log("Error en asignar endpoint: " + error)
        return res.status(500).json({ message: 'Hubo un error al asignar vendedor a la compra' });
    } finally {
        await mongoose.disconnect();
        console.log("Desconectado de MongoDB");
    }
} 