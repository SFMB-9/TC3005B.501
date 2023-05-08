/* 
Author: Diego Corrales
Date: 1/5/23
Endpoint to create a dummy user in the db used 
for testing purposes
*/

import Usuario from "../../../models/usuario";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        dbConnect();

        try {
            // Create the User with the defined data
            const usuario = await Usuario.create({ 
                rol_encriptado: "Rol pero encriptado",
                tipo_usuario: "vendedor",
                nombres: "Max",
                apellidos: "Steel",
                email: "AccionTurbo@email.com",
                contrasena: "password",
                direccion: {
                    calle: "Satelite",
                    numero_exterior: "2000",
                    numero_interior: "01",
                    ciudad: "CDMX",
                    estado: "CDMX",
                    pais: "Mexico",
                    codigo_postal: "12345"
                },
                numero_telefonico: "0186969420",
                grupo_automotriz: "Mazda Co.",
                agencia: "Mazda Santa Fe",
                agencia_id: "1234567890",
                gerente_id: "6458716c0628c82dc52b0cba",
                contar_ventas_en_proceso: 2,
                contar_ventas_completas: 1,
            });

            const usuarioJSON = usuario.toJSON();
            
            const result = {
                usuario_id: usuarioJSON._id,
            }; 

            return res
                .status(200)
                .json({ message: 'Usuario vendedor dummy creado exitosamente', result: result });
        } catch(err) {
            return res.status(400).json({ message: 'Error al crear usuario dummy', error: err.message});
        }
    }
}
