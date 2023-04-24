/* 
[H_004]
Endpoint para buscar a todos los vendedores pertenecientes
a la agencia de un Gerente por el nombre. Utilizado cuando 
se realiza la busqueda por nombre en la pagina de visualizacion
de usuarios del Gerente.

Autor: Diego Corrales
*/

import connectToDatabase from "@/utils/mongodb";

export default async function handler(req, res) {
    const client = await connectToDatabase;
    const db = client.db("nextjs-mongodb-demo");

    if(req.method === 'GET') {
        try{
            const sellerCollection = db.collection("vendedor");
            const managerSpecificSellers = await sellerCollection.find({ gerente_id: ObjectId(req.gerente_id) })
            
            // Create an index on the name field in order to enable text search
            managerSpecificSellers.createIndex({ nombre: "text" });
            
            // Create the query, searching for the given name
            const query = { $text: { $search: req.nombre} };

            // Create a projection to return the id, name and email of any seller matching the search
            const projection = {
                _id: 1,
                nombre: 1,
                email: 1,
            };

            // Apply the query and projection
            const result = managerSpecificSellers.find(query).project(projection);

            if(result.length === 0){
                return res.status(404).json({ message: "No se encontraron vendedores" });
            }

            if(!result){
                return res.status(500).json({ message: "Error al buscar vendedores" });
            }
            
            // Return list of matching sellers and updated filters
            return res
                .status(200)
                .json({ message: "Vendedores recuperados exitosamente", result: result });
        }
        catch(err){
            return res.status(400).json({ message: "Error al buscar vendedores", error: err.message });
        }
    }
}