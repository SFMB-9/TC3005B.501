/*

Sebastian Gonzalez Villacorta
19/5/2023
Description: Search for cars in elasticsearch using filters or matches in each field

*/

// Connecting to ElasticSearch with security disabled
const { Client } = require('@elastic/elasticsearch')


export default async function handler(req, res) {
    const client = new Client({ node: 'http://localhost:9200' });

    let query = {};

    console.log("Search query: " + req.query.search);
    let searchResults = await fetch(`http://localhost:3000/api/catalogoNuevo/search?search=${req.query.search}`);

    let searchResultsJson = await searchResults.json();
    let searchResultsIds = searchResultsJson.result.map(item => item._id);
    console.log("Search results: " + searchResultsIds);

    if (searchResultsIds.length > 0) {
        query = buildQuery(req.query, searchResultsIds, {});
    } else {
        return res.status(404).json({ message: "No se encontraron autos" });
    }

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
        await assembleFilter(result, filters);

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
                filters: filters,
                filterHeaders: filterHeaders
            });
    } catch (err) {
        return res.status(400).json({ message: 'Error al buscar autos', error: err.message });
    }

}

// Function to assemble the filters from the catalog results
async function assembleFilter(result, filters) {

    let response = await fetch('http://localhost:3000/api/catalogoNuevo/marcas');

    let marcaResponse = await response.json();
    let marca = marcaResponse.result;

    let modelo = [...new Set(result.map(item => item._source.modelo))];
    let ano = [...new Set(result.map(item => item._source.año))];
    let color = [...new Set(result.map(item => item._source.color))];
    let combustible = [...new Set(result.map(item => item._source.combustible))];
    let motor = [...new Set(result.map(item => item._source.motor))];
    let tipo_vehiculo = [...new Set(result.map(item => item._source.tipo_vehiculo))];
    let estado_agencia = [...new Set(result.map(item => item._source.estado_agencia))];

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

    dbQuery.query = {
        bool: {
            must: [],
            should: []
        }
    };

    if (searchResultsIds.length > 0) {
        searchResultsIds.forEach(id => {
            dbQuery.query.bool.must.push({
                match: {
                    _id: id
                }
            });
        });
    }

    if (queryParams.marca) {
        queryParams.marca.split(",").forEach(marca => {
            dbQuery.query.bool.should.push({
                match: {
                    marca: marca
                }
            });
        });
    }

    if (queryParams.modelo) {
        queryParams.modelo.split(",").forEach(modelo => {
            dbQuery.query.bool.should.push({
                match: {
                    modelo: modelo
                }
            });
        });
    }

    if (queryParams.ano) {
        queryParams.ano.split(",").forEach(ano => {
            dbQuery.query.bool.should.push({
                match: {
                    año: ano
                }
            });
        });
    }

    // Fix filter by color
    if (queryParams.color) {
        dbQuery.query.bool.must.push({
            match: {
                color: queryParams.color
            }
        });
    }

    if (queryParams.combustible) {
        queryParams.combustible.split(",").forEach(combustible => {
            dbQuery.query.bool.should.push({
                match: {
                    combustible: combustible
                }
            });
        });
    }

    if (queryParams.motor) {
        queryParams.motor.split(",").forEach(motor => {
            dbQuery.query.bool.should.push({
                match: {
                    motor: motor
                }
            });
        });
    }

    if (queryParams.tipo_vehiculo) {
        queryParams.tipo_vehiculo.split(",").forEach(tipo_vehiculo => {
            dbQuery.query.bool.should.push({
                match: {
                    tipo_vehiculo: tipo_vehiculo
                }
            });
        });
    }

    if (queryParams.estado_agencia) {
        queryParams.estado_agencia.split(",").forEach(estado_agencia => {
            dbQuery.query.bool.should.push({
                match: {
                    estado_agencia: estado_agencia
                }
            });
        });
    }

    if (queryParams.precio_min) {
        dbQuery.query.bool.must.push({
            range: {
                precio: {
                    gte: queryParams.precio_min
                }
            }
        });
    }

    if (queryParams.precio_max) {
        dbQuery.query.bool.must.push({
            range: {
                precio: {
                    lte: queryParams.precio_max
                }
            }
        });
    }

    return dbQuery;
}
