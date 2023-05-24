/* 
Diego Corrales Pinedo
15/5/23
Endpoint to create a driving test request for 
a final user using elasticsearch for the car. 
Used when clicking the "Request driving test" 
button in the test-detail page.
*/

const mongoose = require('mongoose');
import Proceso from "../../../models/procesos";
import Usuario from "../../../models/usuario";
import dbConnect from "../../../config/dbConnect";

export default async (req, res) => {
    await dbConnect();
    try {
        let rawResult = await fetch(`http://localhost:3000/api/prueba-manejo/get-car-info-elastic?auto_id=${req.body.auto_id}`, 
        {method: 'GET'});
        const jsonResult = await rawResult.json();
        const carData = jsonResult.auto._source;
        
        const userData = await Usuario.findById(req.body.user_id);
        const agencyData = await Usuario.findOne({ "nombres": carData.nombre_agencia, "tipo_usuario": "agencia" });
        
        // Create the Process with the defined data
        const proceso = await Proceso.create({ 
            tipo_proceso: "pruebaManejo",
            estatus_validacion: "En proceso",
            documentos_url: req.body.documents,
            grupo_automotriz_id: agencyData["grupo_automotriz_id"],
            nombre_agencia: carData.nombre_agencia,
            direccion: userData["direccion"],
            fecha_inicio: Date.now(),
            grupo_automotriz: agencyData["grupo_automotriz"],
            superadmin: agencyData["superadmin"],
            usuario_final_id: req.body.user_id,
            auto: {
                "auto_id": req.body.auto_id,
                "marca": carData.marca,
                "modelo": carData.modelo,
                "ano": carData.año,
                "precio": carData.precio,
                "array_fotografias_url": carData.fotos_3d
            },
            direccion_agencia: carData.direccion_agencia,
            numero_telefonico: agencyData["numero_telefonico"],
            comentarios: "",
        });

        const procesoJSON = proceso.toJSON();
        
        const result = {
            proceso_id: procesoJSON._id,
        };

        return res
            .status(200)
            .json({ message: 'Proceso de prueba de manejo creado exitosamente', result: result });
    } catch(error) {
        console.log(error)
        return res.status(400).json({ message: 'Error al crear proceso de prueba de manejo', error: error.message});
    } finally {
        await mongoose.disconnect();
    }
}
