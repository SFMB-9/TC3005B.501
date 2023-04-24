/* 
[H_059][H_060]

Endpoint para visualizar el detalle de compra por parte de 
un usuario Comprador. Utilizado cuando se carga la pagina
de detalle de compra.

Autor: Diego Corrales
*/

import connectToDatabase from "@/utils/mongodb";


export default async function handler(req, res) {
    const client = await connectToDatabase;
    const db = client.db("nextjs-mongodb-demo");

    if(req.method === 'GET' && req.body !== null) {
        try {
            const saleProcessCollection = db.collection("proceso_venta");
            const saleProcess = await saleProcessCollection.findOne({ _id: ObjectId(req.proceso_id)});

            const carCollection = db.collection("automovil");
            const carData = await carCollection.findOne({ _id: ObjectId(saleProcess["auto_id"])});

            const agencyCollection = db.collection("agencia");
            const agencyData = await agencyCollection.findOne({ _id: ObjectId(carData["agencia_id"])});

            const directionCollection = db.collection("direccion");
            const directionData = await directionCollection.findOne({ _id: ObjectId(agencyData["direccion_id"])});

            const autoGroupCollection = db.collection("grupo_automotriz");
            const autoGroupData = await autoGroupCollection.findOne({ _id: ObjectId(agencyData["grupo_automotriz_id"])});

            const documentCollection = db.collection("documentos");
            const documentsList = await documentCollection.find({ usuario_propietario_id: ObjectId(saleProcess["usuario_final_id"])});

            const result = { 
                usuario_final_id: saleProcess["usuario_final_id"],
                vendedor_id: saleProcess["vendedor_id"],
                chat_id: saleProcess["chat_id"],
                marca: carData["marca"],
                modelo: carData["modelo"],
                ano: carData["ano"],
                precio: carData["precio"],
                array_fotografias_url: carData["array_fotografias_url"],
                estado: directionData["estado"],
                ciudad: directionData["ciudad"],
                calle: directionData["calle"],
                nombre_grupo_automotriz: autoGroupData["nombre_grupo_automotriz"],
                documentos: documentsList,
            }

            return res
                .status(200)
                .json({ message: 'Detalle de compra recuperado exitosamente', result: result });
        } catch(err) {
            return res.status(400).json({ message: 'Error al recuperar detalle de compra', error: err});
        }
    }
}