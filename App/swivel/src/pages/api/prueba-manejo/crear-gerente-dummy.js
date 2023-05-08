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
                tipo_usuario: "gerente",
                nombres: "Pedro",
                apellidos: "Pascual",
                email: "PPPapi@email.com",
                contrasena: "password",
                direccion: {
                    calle: "Rodavento",
                    numero_exterior: "10",
                    numero_interior: "50",
                    ciudad: "Toluca",
                    estado: "Edomex",
                    pais: "Mexico",
                    codigo_postal: "04321"
                },
                numero_telefonico: "0180042069",
                grupo_automotriz: "Mazda Co.",
                agencia: "Mazda Santa Fe",
                agencia_id: "1234567890",
                horas_min: 4,
                horas_max: 20,
                dias_anticipo: 6,
                dias_max: 9
            });

            const usuarioJSON = usuario.toJSON();
            
            const result = {
                usuario_id: usuarioJSON._id,
            }; 

            return res
                .status(200)
                .json({ message: 'Usuario gerente dummy creado exitosamente', result: result });
        } catch(err) {
            return res.status(400).json({ message: 'Error al crear usuario dummy', error: err.message});
        }
    }
}
