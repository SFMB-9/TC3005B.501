/*
Sebastián González Villacorta
05/06/2023
*/

import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const client = await connectToDatabase;
    const db = client.db("test");
    const procesos = await db.collection("procesos");

    const documentos = [];

    req.body.docs.forEach((documento) => {
      documentos.push({
        nombre_documento: documento,
        url: "",
        fecha_modificacion: "",
        estatus: "Pendiente",
        comentarios: "",
      });
    });

    const proc = {
      tipo_proceso: "registroAgencia",
      estatus_validacion: "pendiente",

      info_agencia: {
        nombres: req.body.nombre_agencia,
        direccion: {
          calle: req.body.direccion.calle,
          numero_exterior: req.body.direccion.numero_exterior,
          numero_interior: req.body.direccion.numero_interior,
          ciudad: req.body.direccion.ciudad,
          estado: req.body.direccion.estado,
          pais: req.body.direccion.pais,
          codigo_postal: req.body.direccion.codigo_postal,
        },

        numero_telefonico: req.body.agencyPhone,
        email: req.body.agencyEmail,
        url: req.body.url,
        rfc: req.body.rfc,
      },

      documentos: documentos,
      fecha_creacion: new Date(),
      grupo_automotriz_id: req.body.grupo_automotriz_id,
    };

    try {
      const result = await procesos.insertOne(proc);

      const id_proceso = result.insertedId;
      
      return res.status(200).json({ message: "Process created", id: id_proceso });
    } catch (error){
      return res.status(500).json({ message: "Error creating process", error: error });
    }
  } else {
    res.status(405).json({ message: "Incorrect request method" });
  }
}
