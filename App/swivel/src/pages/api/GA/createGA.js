import dbConnect from "../../../config/dbConnect";
const Usuario = require('../../../models/usuario');
const Proceso = require('../../../models/procesos');


export default async (req, res) => {
   
    const agencia  = req.body.agencia;
    const id = req.body.id;

    if(req.method !== 'PUT'){
        return res.status(405).json({message: 'Metodo no permitido'})
    }
    
    // Connect to the MongoDB database using Mongoose
    dbConnect();

    try {
        // Add GA data to user
        const user = await Usuario.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'No se encontro el usuario' });
        }

        user.nombre_GA = agencia.nombre_GA;
        user.email_GA = agencia.email_GA;
        user.telefono_GA1 = agencia.telefono_GA1;
        user.telefono_GA2 = agencia.telefono_GA2;
        user.url = agencia.url;
        user.nombre_representante = agencia.nombre_representante;
        user.email_representante = agencia.email_representante;
        user.telefono_representante = agencia.telefono_representante;
        user.direccion_GA = agencia.direccion_GA;

        user.save();


        // Respond with a success message

        try {
            const list = ["lisencia", "ine", "comprobante_domicilio"];
            const documentos = [];
            let _id;

            for (let i = 0; i < list.length; i++) {
                const nombre_documento = list[i];
                const url = "";
                const estatus = "";
                const comentarios = "";
                const fecha_modificacion = new Date();

                documentos.push({
                    nombre_documento,
                    url,
                    estatus,
                    comentarios,
                    fecha_modificacion,
            });
            
            await Proceso.create({tipo_proceso: "solicitud_GA", documentos  }).then(createdProcess => {
                _id = createdProcess._id;
            });
            }
            res.status(200).json({ message: 'GA y Proceso creado', _id},)
        }
        catch (error) {
            console.error(error);
            // Respond with an error message
            res.status(500).json({ message: 'Hubo un error al crear el proceso' });
        }
    } catch (error) {
        console.error(error);
        // Respond with an error message
        res.status(500).json({ message: 'Hubo un error al crear la compra' });
    }
};



