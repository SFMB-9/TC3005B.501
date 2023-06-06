/*

Sebastian Gonzalez Villacorta
19/5/2023
Description: Search for cars in elasticsearch using filters or matches in each field

*/

// Connecting to ElasticSearch with security disabled
//import fetch from 'node-fetch';
const { Client } = require('@elastic/elasticsearch')
const json5 = require('json5');
const { ELASTIC_API_KEY } = process.env


export default async function handler(req, res) {
    console.log("QUERY IN ENDPOINT: " + JSON.stringify(req.query));

    //const client = new Client({ node: 'http://localhost:9200' });
    const client = new Client({
        node: ' https://swivelelastictest.es.us-east4.gcp.elastic-cloud.com/',
        auth: {
            apiKey: ELASTIC_API_KEY
        }
    })

    let query = {};

    // Asigns an empty string to searchQuery if it is undefined
    let searchQuery = req.query.search || '';

    // Construct the URL object
    let url = new URL('/api/catalogoNuevo/search', `http://${req.headers.host}`);
    url.searchParams.append('search', searchQuery);

    // Fetch resluts based on the search query
    let searchResults = await fetch(url.toString());

    // Convert the results to json and extract the ids
    let searchResultsJson = await searchResults.json();
    const searchIds = searchResultsJson.result;

    // Handles the cases where searchids is undefined or empty
    if (searchIds !== undefined) {
        if (searchIds.length > 0) {
            query = buildQuery(req.query, searchIds, {});
        } else {
            console.log("No se encontraron autos")
            return res.status(404).json({ message: "No se encontraron autos" });
        }
    } else {
        console.log("No se encontraron autos")
        return res.status(404).json({ message: "No se encontraron autos" });
    }

    // Constant headers for the filters
    const filterHeaders = {
        marca: "Marca",
        modelo: "Modelo",
        ano: "Año",
        precio: "Precio",
        color: "Color",
        combustible: "Combustible",
        //transmision: "Transmisión",
        cantidad: "Cantidad",
        motor: "Motor",
        estado_agencia: "Estado de la agencia",
        municipio_agencia: "Municipio de la agencia",
        tipo_vehiculo: "Tipo de vehículo"
    };

    if (req.method !== 'GET') {
        return res.status(400).json({ message: 'Method not allowed' });
    }

    try {
        let elasticResponse = await client.search({
            index: 'autos',
            body: query
        }, { meta: true });

        let result = elasticResponse.body.hits.hits;

        let filters = {};
        await assembleFilter(result, filters, req);

        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontraron autos", filterHeaders: filterHeaders });
        }

        if (!result) {
            return res.status(500).json({ message: "Error al buscar autos", filterHeaders: filterHeaders });
        }

        return res
            .status(200)
            .json({
                message: result.length + " auto(s) recuperados exitosamente",
                result: result,
                filters: filters,
                filterHeaders: filterHeaders
            });
    } catch (err) {
        return res.status(400).json({ message: 'Error al buscar autos', error: err.message, filterHeaders: filterHeaders });
    }

}

// Function to assemble the filters from the catalog results
async function assembleFilter(result, filters, req) {
    // Construct the URL object
    let url = new URL('/api/catalogoNuevo/marcas', `http://${req.headers.host}`);
    let response = await fetch(url.toString());

    let marcaResponse = await response.json();
    let marca = marcaResponse.result.sort();

    let modelo = [...new Set(result.map(item => item._source.modelo))];
    modelo.sort();
    let ano = [...new Set(result.map(item => item._source.año))];
    ano.sort().reverse();
    let color = [...new Set(result.map(item => json5.parse(item._source.colores).map(item => item.nombre)).flat())];
    color.sort();
    let combustible = [...new Set(result.map(item => item._source.combustible))];
    combustible.sort();
    let motor = [...new Set(result.map(item => item._source.motor))];
    motor.sort();
    let tipo_vehiculo = [...new Set(result.map(item => item._source.tipo_vehiculo))];
    tipo_vehiculo.sort();
    let estado_agencia = [...new Set(result.map(item => item._source.estado_agencia))];
    estado_agencia.sort();

    filters.marca = marca;
    filters.modelo = modelo;
    filters.ano = ano;
    filters.color = color;
    filters.combustible = combustible;
    filters.motor = motor;
    filters.tipo_vehiculo = tipo_vehiculo;
    filters.estado_agencia = estado_agencia;

    return filters;
}

// Function to build elasticsearch search body
function buildQuery(queryParams, searchResultsIds, dbQuery) {
    dbQuery.size = 900;
    dbQuery.query = {
        bool: {
            must: []
        }
    };

    if (searchResultsIds.length > 0) {
        dbQuery.query.bool.must.push({
            terms: {
                _id: searchResultsIds
            }
        });
    }

    if (queryParams.marca) {
        dbQuery.query.bool.must.push({
            bool: {
                should:
                    queryParams.marca.split(",").map(marca => {
                        return { "match_phrase": { "marca": marca } }
                    })
            }
        });
    }

    if (queryParams.modelo) {
        dbQuery.query.bool.must.push({
            bool: {
                should:
                    queryParams.modelo.split(",").map(modelo => {
                        return { "match_phrase": { "modelo": modelo } }
                    })
            }
        });
    }

    if (queryParams.ano) {
        dbQuery.query.bool.must.push({
            bool: {
                should:
                    queryParams.ano.split(",").map(ano => {
                        return { "match_phrase": { "año": ano } }
                    })
            }
        });
    }

    // Fix filter by color
    if (queryParams.color) {
        dbQuery.query.bool.must.push({
            bool: {
                should:
                    queryParams.color.split(",").map(color => {
                        return { "match_phrase": { "colores.nombre": color } }
                    }
                    )
            }
        });
    }

    if (queryParams.combustible) {
        dbQuery.query.bool.must.push({
            bool: {
                should:
                    queryParams.combustible.split(",").map(combustible => {
                        return { "match_phrase": { "combustible": combustible } }
                    })
            }
        });
    }

    if (queryParams.motor) {
        dbQuery.query.bool.must.push({
            bool: {
                should:
                    queryParams.motor.split(",").map(motor => {
                        return { "match_phrase": { "motor": motor } }
                    })
            }
        });
    }

    if (queryParams.tipo_vehiculo) {
        dbQuery.query.bool.must.push({
            bool: {
                should:
                    queryParams.tipo_vehiculo.split(",").map(tipo_vehiculo => {
                        return { "match_phrase": { "tipo_vehiculo": tipo_vehiculo } }
                    })
            }
        });
    }

    if (queryParams.estado_agencia) {
        dbQuery.query.bool.must.push({
            bool: {
                should:
                    queryParams.estado_agencia.split(",").map(estado_agencia => {
                        return { "match_phrase": { "estado_agencia": estado_agencia } }
                    })
            }
        });
    }

    if (queryParams.precio_min && queryParams.precio_max) {
        dbQuery.query.bool.must.push({
            range: {
                precio: {
                    gte: queryParams.precio_min,
                    lte: queryParams.precio_max
                }
            }
        });
    }

    if (queryParams.agencia_id) {
        console.log("Llegale mi buen: " + queryParams.agencia_id);
        dbQuery.query.bool.must.push({
            match: {
                agencia_id: queryParams.agencia_id
            }
        });
    }

    console.log(JSON.stringify(dbQuery));

    return dbQuery;
}
