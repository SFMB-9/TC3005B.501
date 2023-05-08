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
                tipo_usuario: "comprador",
                nombres: "David",
                apellidos: "Attenboroughooughgh",
                email: "david@email.com",
                contrasena: "password",
                direccion: {
                    calle: "Las Lomas",
                    numero_exterior: "100",
                    numero_interior: "5",
                    ciudad: "CDMX",
                    estado: "CDMX",
                    pais: "Mexico",
                    codigo_postal: "01234"
                },
                numero_telefonico: "0180069420",
                documentos_url: [{
                    nombre_documento: "licencia",
                    url: "sample.com",
                    fecha_modificacion: Date.now(),
                    estatus: "En proceso",
                    comentarios: "Ta borrosa"
                },
                {
                    nombre_documento: "ID",
                    url: "sample.id.com",
                    fecha_modificacion: Date.now(),
                    estatus: "En proceso",
                    comentarios: "Debe ser a color"
                }],
            });

            const usuarioJSON = usuario.toJSON();
            
            const result = {
                usuario_id: usuarioJSON._id,
            }; 

            return res
                .status(200)
                .json({ message: 'Usuario comprador dummy creado exitosamente', result: result });
        } catch(err) {
            return res.status(400).json({ message: 'Error al crear usuario dummy', error: err.message});
        }
    }
}
