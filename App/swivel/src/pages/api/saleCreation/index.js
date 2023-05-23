/*

Sebastian Gonzalez Villacorta
21/5/2023

Description: Create new entry of proceso de venta in MongoDB

*/

import mongoose from "mongoose";
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');
const Usuario = require('../../../models/usuario');

export default async function handler(req, res) {

    const parsedBody = JSON.parse(req.body);

    console.log(JSON.parse(req.body).usuario_final_id);

    await dbConnect();

    try {

        const resultVendedor = await Usuario
            .find({ "contar_ventas_en_proceso": { $exists: true, $lt: Infinity } })
            .sort({ "contar_ventas_en_proceso": 1 })
            .limit(1, { _id: 0, _id: 1 })
            .select("_id")
            .lean()
            .exec();

        if (resultVendedor.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const id_vendedor = resultVendedor;

        await Usuario.updateOne({ "_id": id_vendedor }, { $inc: { "contar_ventas_en_proceso": 1 } });

        const usuarioVendedor = await Usuario.findById(id_vendedor);
        
        const agenciaVendedor = await Usuario.findById(usuarioVendedor.agencia_id);

        const usuarioId = parsedBody.usuario_final_id;
        const usuario = await Usuario.findById(usuarioId);
        
        const proceso = new Proceso({
            tipo_proceso: "solicitudCompra",
            estatus: "documentosPendientes",
            documentos: [],
            fecha_creacion: Date.now(),
            auto: parsedBody.auto, //Llega del request
            usuario_final: usuario,
            vendedor: usuarioVendedor,
            agencia: agenciaVendedor,
            cantidad_a_pagar: parsedBody.cantidad_a_pagar, //Llega del request
        });

        await proceso.save()

        const id = proceso._id;

        return res.status(200).json({ message: 'Compra creada', id: id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Hubo un error al crear la compra', error: error });
    } finally {
        await mongoose.disconnect();
        console.log("Desconectado de MongoDB");
    }

}

