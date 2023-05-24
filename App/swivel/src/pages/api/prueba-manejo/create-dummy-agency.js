import Proceso from "../../../models/procesos";
import Usuario from "../../../models/usuario";
import dbConnect from "../../../config/dbConnect";

export default async (req, res) => {
    dbConnect();
    
    try {
        // Create the Process with the defined data
        const agencia = await Usuario.create({ 
            rol_encriptado: "Rol",
            tipo_usuario: "agencia",
            nombres: "Kia Cuajimalpa",
            apellidos: "",
            email: "zoomzoom@gmail.com",
            contrasena: "password",
            direccion: {
                calle: "Av. Santa Fe",
                numero_exterior: "100",
                numero_interior: "5",
                ciudad: "CDMX",
                estado: "Ciudad de Mexico",
                pais: "Mexico",
                codigo_postal: "01800"
            },
            numero_telefonico: "5512345678",
            grupo_automotriz: "Mazda Co.",
            gerente_id: "ID del Gerente",
            horas_min: 4,
            horas_max: 20,
            dias_anticipo: 6,
            dias_max: 9,
        });

        const agenciaJSON = agencia.toJSON();
        
        const result = {
            agencia_id: agenciaJSON._id,
        };

        return res
            .status(200)
            .json({ message: 'Agencia dummy creada exitosamente', result: result });
    } catch(error) {
        console.log(error)
        return res.status(400).json({ message: 'Error al crear proceso de prueba de manejo', error: error.message});
    } finally {
        await mongoose.disconnect();
    }
}
