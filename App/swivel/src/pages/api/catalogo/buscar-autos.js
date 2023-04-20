// Search for cars in the database using query parameters
import connectToDatabase from "../../util/mongodb";

export default async function handler(req, res) {
    const client = await connectToDatabase;
    const db = client.db("nextjs-mongodb-demo");
    
    // Assemble the query using the query parameters
    const query = buildQuery(req.query, {});
    console.log(query)

    if(req.method === 'GET') {
        try{
        // Make the custom query to the database
        let result = await db
            .collection("posts")
            .find(query)
            .toArray();
        
        // Assemble the filters using a set of the catalog results
        let filters = {};
        assembleFilter(result, filters);

        if(result.length === 0){
            return res.status(404).json({ message: "No se encontraron autos" });
        }

        if(!result){
            return res.status(500).json({ message: "Error al buscar autos" });
        }
        
        // Return list of matching cars and updated filters
        return res
            .status(200)
            .json({ message: "Autos recuperados exitosamente", result: result, filters: filters });
        }
        catch(err){
        return res.status(400).json({ message: "Error al buscar autos", error: err.message });
        }
    }
    }

function assembleFilter(result, filters){
    let marcas = new Set();
    let modelos = new Set();

    result.forEach((auto) => {
        marcas.add(auto.marca);
        modelos.add(auto.modelo);
    });

    filters.marcas = Array.from(marcas);
    filters.modelos = Array.from(modelos);

    return filters;
}

function buildQuery(queryParams, dbQuery){
    let properties;
    let subq = {};
    let arr = [];

    if(queryParams.marca !== undefined){
        properties = queryParams.marca;
        subq.$in = [];
        arr = properties.split(",");
        subq.$in = arr;
        dbQuery.marca = subq;
        subq = {};
        arr = [];
        properties = "";
    }

    if(queryParams.modelo !== undefined){
        properties = queryParams.modelo;
        subq.$in = [];
        arr = properties.split(",");
        subq.$in = arr;
        dbQuery.modelo = subq;
        subq = {};
        arr = [];
        properties = "";
    }

    return dbQuery;
}