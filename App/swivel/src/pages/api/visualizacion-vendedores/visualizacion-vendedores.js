/* 
[H_004]
Endpoint para la visualizacion de todos los vendedores 
pertenecientes a la agencia de un Gerente. Utilizado 
cuando se carga la pagina de visualizacion de usuarios 
del Gerente.

Autor: Diego Corrales
*/

import connectToDatabase from "@/utils/mongodb";


export default async function handler(req, res) {
    const client = await connectToDatabase;
    const db = client.db("nextjs-mongodb-demo");

    if(req.method === 'GET' && req.body !== null) {
        try {
            const sellerCollection = db.collection("vendedor");
            const managerSpecificSellers = await sellerCollection.find({ gerente_id: ObjectId(req.gerente_id) })

            const result = { 
                vendedores: managerSpecificSellers,
            }

            return res
                .status(200)
                .json({ message: 'Vendedores recuperados exitosamente', result: result });
        } catch(err) {
            return res.status(400).json({ message: 'Error al recuperar vendedores', error: err});
        }
    }
}
