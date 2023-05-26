import Proceso from "../../../models/procesos";
import Usuario from "../../../models/usuario";
import dbConnect from "../../../config/dbConnect";
const mongoose = require('mongoose');

export default async (req, res) => {
    await dbConnect();
    
    try {
        // Create the Process with the defined data
        const agencia = await Usuario.create({ 
            rol_encriptado: "Rol",
            tipo_usuario: "comprador",
            nombres: "Diego",
            apellidos: "Corrales Pinedo",
            email: "diego@gmail.com",
            contrasena: "password",
            direccion: {
                calle: "Profirio Diaz",
                numero_exterior: "10",
                numero_interior: "310",
                ciudad: "CDMX",
                estado: "Ciudad de Mexico",
                pais: "Mexico",
                codigo_postal: "01700"
            },
            numero_telefonico: "5532323232",
            documentos_url: [{
                nombre_documento: "identificacion",
                url: "www.ejemplo.com",
                fecha_modificacion: Date.now(),
                estatus: "aprobado",
                comentarios: ""
            },
            {
                nombre_documento: "licencia",
                url: "www.ejemplo.com",
                fecha_modificacion: Date.now(),
                estatus: "rechazado",
                comentarios: "Debe ser a color"
            }]
        });

        const agenciaJSON = agencia.toJSON();
        
        const result = {
            agencia_id: agenciaJSON._id,
        };

        return res
            .status(200)
            .json({ message: 'Comprador dummy creada exitosamente', result: result });
    } catch(error) {
        console.log(error)
        return res.status(400).json({ message: 'Error al crear comprador dummy', error: error.message});
    } finally {
        await mongoose.disconnect();
    }
}
