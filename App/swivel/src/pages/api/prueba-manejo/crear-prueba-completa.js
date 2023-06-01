/* 
Diego Corrales Pinedo
15/5/23
Endpoint to create a driving test request for 
a final user using elasticsearch for the car. 
Used when clicking the "Request driving test" 
button in the test-detail page.
*/

const { Client } = require('@elastic/elasticsearch');
import connectToDatabase from '@/utils/mongodb'
import { ObjectId } from "mongodb";
const { ELASTIC_API_KEY } = process.env

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
    }

    const clientElastic = new Client({
        node: ' https://swivelelastictest.es.us-east4.gcp.elastic-cloud.com/',
        auth: {
            apiKey: ELASTIC_API_KEY
        }
    })

    const client = await connectToDatabase;
    const db = client.db("test");
    const userCollection = db.collection('usuarios');
    const processCollection = db.collection('procesos');

    try {
        // Find the car specific to the given id
        const auto = await clientElastic.get({
            index: 'autos',
            id: req.body.auto_id
        });

        const carData = auto._source;
        
        // Find the user specific to the given id
        const userData = await userCollection.findOne({_id : new ObjectId(req.body.user_id)});

        // Find the agency specific to the given name
        const agencyData = await userCollection.findOne({ _id: new ObjectId(carData.agencia_id) });

        // Create the Process with the defined data
        const proceso = { 
            tipo_proceso: "pruebaManejo",
            estatus_validacion: "En proceso",
            documentos: req.body.documents,
            grupo_automotriz_id: agencyData["grupo_automotriz_id"],
            nombre_agencia: carData.nombre_agencia,
            direccion: userData["direccion"],
            fecha_inicio: new Date().toISOString(),
            grupo_automotriz: agencyData["grupo_automotriz"],
            superadmin_id: agencyData["superadmin_id"],
            usuario_final_id: req.body.user_id,
            auto: {
                "auto_id": req.body.auto_id,
                "marca": carData.marca,
                "modelo": carData.modelo,
                "ano": carData.año,
                "precio": carData.precio,
                "array_fotografias_url": carData.colores[req.body.image_index].imagenes
            },
            direccion_agencia: carData.direccion_agencia,
            numero_telefonico: agencyData["numero_telefonico"],
            comentarios: "",
            fecha_agendada: new Date(req.body.selected_date),
            hora_agendada: new Date(req.body.selected_time)
        };

        // Insert the created process into the collection
        const result = await processCollection.insertOne(proceso);
        const process_id = result.insertedId;

        // Add the created process to the list of processes the user has
        await userCollection.updateOne({ _id: new ObjectId(userData._id) }, { $push: { procesos: process_id } });

        return res
            .status(200)
            .json({ message: 'Proceso de prueba de manejo creado exitosamente', result: process_id });

    } catch(error) {
        console.log(error)
        return res.status(400).json({ message: 'Error al crear proceso de prueba de manejo', error: error.message});
    }
}