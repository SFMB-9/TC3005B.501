/*

Sebastian Gonzalez Villacorta
19/5/2023

Description: Search for cars in elasticsearch using only natural language

*/

// Connecting to ElasticSearch with security disabled
const { Client } = require('@elastic/elasticsearch')
const { ELASTIC_API_KEY } = process.env

export default async function handler(req, res) {
    //const client = new Client({ node: 'http://localhost:9200' });
    const client = new Client({
        node: ' https://swivelelastictest.es.us-east4.gcp.elastic-cloud.com/',
        auth: {
            apiKey: ELASTIC_API_KEY
        }
    })

    // Initialize empty query
    let query = {};

    // Extract the value of search and remove special characters
    let searchQuery = req.query.search;
    searchQuery = searchQuery.replace(/[^a-zA-Z\s]/g, "");

    // If search is not "", undefined, or null, then build the query
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
            index: 'autos_dev',
            body: query
        }, {meta: true});
        
        let fullResults = elasticResponse.body.hits.hits;

        let result = fullResults.map(item => item._id);

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
