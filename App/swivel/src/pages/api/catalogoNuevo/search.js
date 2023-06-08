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

    let searchQuery = "";

    // Extract the value of search and remove special characters
    if (req.query.search) {
        searchQuery = req.query.search.replace(/[^a-zA-Z\s]/g, "");
    }

    //searchQuery = searchQuery.replace(/[^a-zA-Z\s]/g, "");

    // Initialize empty query
    let dbQuery = {};

    dbQuery.size = 900;

    // If search is not "", undefined, or null, then build the query
    if (Boolean(searchQuery)) {
        const query = {
            "multi_match": {
                "query": searchQuery,
                "fields": ["descripcion", "colores", "marca"],
                "minimum_should_match": 2
            }
        }
        dbQuery.query = query;
    }

    if (req.method !== 'GET') {
        return res.status(400).json({ message: 'Method not allowed' });
    }

    try {

        let elasticResponse = await client.search({
            index: 'autos',
            body: dbQuery,
        }, { meta: true });

        let fullResults = elasticResponse.body.hits.hits;
        let result = fullResults.map(item => item._id);

        let score = {};
        fullResults.forEach(item => {
            score[item._id] = item._score;
        });

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
                result: result,
                score: score
            });

    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al buscar autos' });
    }
}
