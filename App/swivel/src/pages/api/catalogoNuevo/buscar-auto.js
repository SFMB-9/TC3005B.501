/*

Sebastian Gonzalez Villacorta
5/5/2023

Description: Search for cars in elasticsearch

*/

// Connecting to ElasticSearch with security disabled
const { Client } = require('@elastic/elasticsearch')

export default async function handler(req, res){
    const client = new Client({ node: 'http://localhost:9200' });

    let query = {};

    if(req.query && req.query.search === undefined){
        query = buildQuery(req.query, {});
    }

    if(req.query.search){
      query = {
          "track_total_hits": true, 
          "from" : 0, 
          "size" : 1000,
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
    
    if(req.method !== 'GET'){
        res.status(400).json({message: 'Method not allowed'});
    }

    try{
        let elasticResponse = await client.search({
            index: 'autos',
            body: query
        }, {meta: true});

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
                message: "Autos recuperados exitosamente",
                result: result,
                filters: filters,
                filterHeaders: filterHeaders
        });
    } catch (err) {
        return res.status(400).json({ message: "Error al buscar autos", error: err.message });
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
function buildQuery(queryParams, dbQuery) {
    dbQuery.query = {
        bool: {
            must: []
        }
    };

    if (queryParams.marca) {
      dbQuery.query.bool.must.push({
        match: {
          marca: queryParams.marca
        }
      });
    }
  
    if (queryParams.modelo) {
      dbQuery.query.bool.must.push({
        match: {
          modelo: queryParams.modelo
        }
      });
    }
  
    if (queryParams.ano) {
      dbQuery.query.bool.must.push({
        match: {
          año: queryParams.ano
        }
      });
    }
  
    if (queryParams.color) {
      dbQuery.query.bool.must.push({
        match: {
          color: queryParams.color
        }
      });
    }
        
    if (queryParams.combustible) {
      dbQuery.query.bool.must.push({
        match: {
          combustible: queryParams.combustible
        }
      });
    }

    if (queryParams.motor) {
      dbQuery.query.bool.must.push({
        match: {
          motor: queryParams.motor
        }
      });
    }
  
    if (queryParams.tipo_vehiculo) {
      dbQuery.query.bool.must.push({
        match: {
          tipo_vehiculo: queryParams.tipo_vehiculo
        }
      });
    }
  
    if (queryParams.estado_agencia) {
      dbQuery.query.bool.must.push({
        match: {
          estado_agencia: queryParams.estado_agencia
        }
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
