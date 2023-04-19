/* 
[H_063]

Endpoint para visualizar los documentos relacionados a
la solicitud de prueba de manejo de un usuario Comprador. Utilizado 
cuando se carga la pagina de solicitud de prueba de manejo de usuario 
Comprador.

Autor: Diego Corrales
*/


import connectToDatabase from "../../util/mongodb";


export default async function handler(req, res) {
    const client = await connectToDatabase;
    const db = client.db("nextjs-mongodb-demo");

    if(req.method === 'GET' && req.body !== null) {
        try {
            const drivingTestCollection = db.collection("prueba_manejo");
            const drivingTestData = await drivingTestCollection.findOne({ _id: ObjectId(req.prueba_manejo_id)});

            const documentCollection = db.collection("documentos");
            const documentsList = await documentCollection.findAll({ _id: ObjectId(drivingTestData["usuario_final_id"])});

            const result = { 
                documentos: documentsList,
            }

            return res
                .status(200)
                .json({ message: 'Documentos de prueba de manejo recuperado exitosamente', result: result });
        } catch(err) {
            return res.status(400).json({ message: 'Error al recuperar documentos de prueba de manejo', error: err});
        }
    }
}
