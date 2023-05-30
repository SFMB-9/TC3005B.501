/*

Sebastián González Villacorta	

14-05-2023

Description: Endpoint para obtener el detalle de un auto con su id
*/

// Connecting to ElasticSearch with security disabled
const { Client } = require('@elastic/elasticsearch')

export default async function CarDetails(req, res) {
    //const client = new Client({ node: 'http://localhost:9200' });
    const client = new Client({
        node: ' https://swivelelastictest.es.us-east4.gcp.elastic-cloud.com/',
        auth: {
            apiKey: 'blpSdGFvZ0I2RmMxNy1oMFJjQUw6WER6UHc0T3BTUnlld0lzWUEwRzFTQQ=='
        }
    })

    if (req.method !== 'GET') {
        res.status(400).json({ message: 'Method not allowed' });
    }

    let car_id = req.query.car_id;

    try {
        let elasticResponse = await client.get({
            index: 'autos',
            id: car_id
        }, { meta: true });

        let result = elasticResponse.body._source;

        if (!result) {
            return res.status(500).json({ message: "Detalle de Auto no encontrado" });
        }

        return res
            .status(200)
            .json({
                message: "Detalles de Auto recuperados exitosamente",
                result: result
            });

    } catch (err) {
        return res.status(400).json({ message: "Error al obtener detalles de Auto", error: err.message });
    }



}
