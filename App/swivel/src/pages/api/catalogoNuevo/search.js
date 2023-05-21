/*

Sebastian Gonzalez Villacorta
19/5/2023

Description: Search for cars in elasticsearch using only natural language

*/

// Connecting to ElasticSearch with security disabled
const { Client } = require('@elastic/elasticsearch')

export default async function handler(req, res) {
    const client = new Client({ node: 'http://localhost:9200' });

    // Initialize empty query
    let query = {};

    // Extract the value of search and remove special characters
    let searchQuery = req.query.search;
    searchQuery = searchQuery.replace(/[^a-zA-Z ]/g, "");

    // If search is not "", undefeined, or null, then build the query
    if (Boolean(searchQuery)) {
        query = {
            "track_total_hits": true,
            "from": 0,
            "size": 1000,
            "query": {
                "match": {
                    "descripcion": {
                        "query": req.query.search,
                        "minimum_should_match": 2
                    }
                }
            }
        }
    }
    
    if(req.method !== 'GET'){
        return res.status(400).json({message: 'Method not allowed'});
    }

    try{
        let elasticResponse = await client.search({
            index: 'autos',
            body: query
        }, {meta: true});
        
        let result = elasticResponse.body.hits.hits;

        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontraron autos" });
          }
    
        if (!result) {
            return res.status(500).json({ message: "Error al buscar autos" });
        }

        return res
            .status(200)
            .json({
                message: result.length + " auto(s) recuperados exitosamente",
                result: result
        });

    } catch (error) {
        res.status(500).json({message: error.message || 'Error al buscar autos'});
    }
}
