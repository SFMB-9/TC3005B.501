/*

Sebastian Gonzalez Villacorta
29/5/2023

Description: Create new entry of proceso de venta in MongoDB

*/

import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await connectToDatabase;
    const db = client.db("test");
    const usuarios = await db.collection("usuarios")

    const parsedBody = JSON.parse(req.body);
    const auto = parsedBody.auto;

    try {
        const resultVendedor = await usuarios
            .find({ "contar_ventas_en_proceso": { $exists: true, $lt: Infinity } })
            .sort({ "contar_ventas_en_proceso": 1 })
            .limit(1, { _id: 0, _id: 1 })
            .toArray();

        if (resultVendedor.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const id_vendedor = resultVendedor[0]._id;

        await usuarios.updateOne({ "_id": new ObjectId(id_vendedor) }, { $inc: { "contar_ventas_en_proceso": 1 } });

        const usuarioVendedor = await usuarios.findOne({ "_id": new ObjectId(id_vendedor) });

        const agenciaVendedor = await usuarios.findOne({ "_id": new ObjectId(usuarioVendedor.agencia_id) });

        const usuarioId = parsedBody.usuario_final_id;
        
        const documentsPurchase = agenciaVendedor.documentos_requeridos_compra;

        const documentosProceso = []

        documentsPurchase.forEach(documento => {
            documentosProceso.push({
                nombre_documento: documento,
                url: "",
                fecha_modificacion: null,
                estatus: "Pendiente",
                comentarios: ""
            })
        });

        const proceso = {
            tipo_proceso: "solicitudCompra",
            estatus: "documentosPendientes",
            documentos: documentosProceso,
            fecha_creacion: new Date().toISOString(),
            auto: auto, //Llega del request
            usuario_final_id: usuarioId,
            vendedor: usuarioVendedor,
            agencia: agenciaVendedor,
            cantidad_a_pagar: parsedBody.cantidad_a_pagar
        };

        const result = await db.collection("procesos").insertOne(proceso);

        const id_proceso = result.insertedId;

        return res.status(200).json({ message: 'Compra creada', id: id_proceso });
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error al crear la compra', error: error });
    }

}