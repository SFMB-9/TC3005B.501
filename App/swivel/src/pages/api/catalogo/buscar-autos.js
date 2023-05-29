/*

Sebastian Gonzalez Villacorta
26/4/2023

Description: Search for cars in the database using query parameters

*/

import connectToDatabase from "@/utils/mongodb";

export default async function handler(req, res) {
  const client = await connectToDatabase;
  const db = client.db("nextjs-mongodb-demo");

  // Assemble the query using the query parameters
  const query = buildQuery(req.query, {});
  console.log(query);

  const filterHeaders = {
    marca: "Marca",
    modelo: "Modelo",
    ano: "Año",
    precio: "Precio",
    color: "Color",
    combustible: "Combustible",
    rendimiento: "Rendimiento",
    transmision: "Transmisión",
    cantidad: "Cantidad",
    motor: "Motor",
    estado_agencia: "Estado de la agencia",
    municipio_agencia: "Municipio de la agencia",
    tipo_vehiculo: "Tipo de vehículo"
  };
  
  if (req.method === "GET") {
    try {
      // Make the custom query to the database
      let result = await db.collection("posts").find(query).toArray();

      // Assemble the filters using a set of the catalog results
      let filters = {};
      assembleFilter(result, filters);

      if (result.length === 0) {
        return res.status(404).json({ message: "No se encontraron autos" });
      }

      if (!result) {
        return res.status(500).json({ message: "Error al buscar autos" });
      }

      // Return list of matching cars and updated filters
      return res
        .status(200)
        .json({
          message: "Autos recuperados exitosamente",
          result: result,
          filters: filters,
          filterHeaders: filterHeaders
        });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error al buscar autos", error: err.message });
    }
  }
}

function assembleFilter(result, filters) {
    let marca = new Set();
    let modelo = new Set();
    let ano = new Set();
    let color = new Set();
    let combustible = new Set();
    let transmision = new Set();
    let motor = new Set();
    let tipo_vehiculo = new Set();
    let estado_agencia = new Set();

    result.forEach((auto) => {
        marca.add(auto.marca);
        modelo.add(auto.modelo);
        ano.add(auto.ano);
        color.add(auto.color);
        combustible.add(auto.combustible);
        transmision.add(auto.transmision);
        motor.add(auto.motor);
        tipo_vehiculo.add(auto.tipo_vehiculo);
        estado_agencia.add(auto.estado_agencia);
    });

    filters.marca = Array.from(marca);
    filters.modelo = Array.from(modelo);
    filters.ano = Array.from(ano);
    filters.color = Array.from(color);
    filters.combustible = Array.from(combustible);
    filters.transmision = Array.from(transmision);
    filters.motor = Array.from(motor);
    filters.tipo_vehiculo = Array.from(tipo_vehiculo);
    filters.estado_agencia = Array.from(estado_agencia);

  return filters;
}

function buildQuery(queryParams, dbQuery) {
  let properties;
  let subq = {};
  let arr = [];

  if (queryParams.marca !== undefined) {
    properties = queryParams.marca;
    subq.$in = [];
    arr = properties.split(",");
    subq.$in = arr;
    dbQuery.marca = subq;
    subq = {};
    arr = [];
    properties = "";
  }

    if (queryParams.modelo !== undefined) {
        properties = queryParams.modelo;
        subq.$in = [];
        arr = properties.split(",");
        subq.$in = arr;
        dbQuery.modelo = subq;
        subq = {};
        arr = [];
        properties = "";
    }

    if (queryParams.ano !== undefined) {
        properties = queryParams.ano;
        subq.$in = [];
        arr = properties.split(",");
        let arrNum = [];
        arr.forEach ((element) => {
            arrNum.push(parseInt(element));
        });
        subq.$in = arrNum;
        dbQuery.ano = subq;
        subq = {};
        arr = [];
        properties = "";
    }

    if (queryParams.color !== undefined) {
        properties = queryParams.color;
        subq.$in = [];
        arr = properties.split(",");
        subq.$in = arr;
        dbQuery.color = subq;
        subq = {};
        arr = [];
        properties = "";
    }
    
    if (queryParams.combustible !== undefined) {
        properties = queryParams.combustible;
        subq.$in = [];
        arr = properties.split(",");
        subq.$in = arr;
        dbQuery.combustible = subq;
        subq = {};
        arr = [];
        properties = "";
    }

    if (queryParams.transmision !== undefined) {
        properties = queryParams.transmision;
        subq.$in = [];
        arr = properties.split(",");
        subq.$in = arr;
        dbQuery.transmision = subq;
        subq = {};
        arr = [];
        properties = "";
    }

    if (queryParams.motor !== undefined) {
        properties = queryParams.motor;
        subq.$in = [];
        arr = properties.split(",");
        subq.$in = arr;
        dbQuery.motor = subq;
        subq = {};
        arr = [];
        properties = "";
    }

    if (queryParams.tipo_vehiculo !== undefined) {
        properties = queryParams.tipo_vehiculo;
        subq.$in = [];
        arr = properties.split(",");
        subq.$in = arr;
        dbQuery.tipo_vehiculo = subq;
        subq = {};
        arr = [];
        properties = "";
    }

    if (queryParams.estado_agencia !== undefined) {
        properties = queryParams.estado_agencia;
        subq.$in = [];
        arr = properties.split(",");
        subq.$in = arr;
        dbQuery.estado_agencia = subq;
    }


  return dbQuery;
}
