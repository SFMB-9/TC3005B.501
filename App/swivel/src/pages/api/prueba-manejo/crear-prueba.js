/* 
Author: Diego Corrales
Date: 7/5/23
Endpoint to create a driving test request for 
a final user. Used when clicking the "Request 
driving test" button in the car detail page.
*/

import Proceso from "../../../models/procesos";
import Auto from "../../../models/auto";
import Usuario from "../../../models/usuario";
import dbConnect from "../../../config/dbConnect";
import axios from 'axios';

export default async (req, res) => {
    dbConnect();
    
    try {
        const carData = await Auto.findById(req.body.auto_id); 
        const userData = await Usuario.findById(req.body.user_id);
        const agencyData = await Usuario.findById(carData["gerente_id"]);
        
        const direccionAgencia = {
            calle: "Santo Tomas",
            numero_exterior: "100",
            numero_interior: "2",
            ciudad: "Toluca",
            estado: "Estado de Mexico",
            pais: "Mexico",
            codigo_postal: "01200"
        } 

        // Create the Process with the defined data
        const proceso = await Proceso.create({ 
            tipo_proceso: "prueba_manejo",
            estatus_validacion: "En proceso",
            documentos_url: userData["documentos_url"],
            grupo_automotriz_id: carData["grupo_automotriz_id"],
            agencia_id: carData["agencia_id"],
            direccion: userData["direccion"],
            fecha_inicio: Date.now(),
            grupo_automotriz: carData["grupo_automotriz"],
            usuario_final_id: req.body.user_id,
            auto: {
                "auto_id": req.body.auto_id,
                "marca": carData["marca"],
                "modelo": carData["modelo"],
                "ano": carData["ano"],
                "precio": carData["precio"],
                "array_fotografias_url": carData["array_fotografias_url"]
            },
            direccion_agencia: direccionAgencia,
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
    }
}
