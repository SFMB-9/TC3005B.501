/*
Sebastián González Villacorta
05/06/2023
*/
import connectToDatabase from "@/utils/mongodb";

export default async function handler(req, res) {
  const client = await connectToDatabase;
  const db = client.db("test");
  const procesos = await db.collection("procesos")

  if (req.method === "POST") {

    const street = req.body.direccion.calle;
    const exterior_num = req.body.direccion.numero_exterior;
    const interior_num = req.body.direccion.numero_interior;
    const city = req.body.direccion.ciudad;
    const state = req.body.direccion.estado;
    const country = req.body.direccion.pais;
    const postalCode = req.body.direccion.codigo_postal;

    const legalName = req.body.legal.lNombres;
    const legalSurname = req.body.legal.lApellidos;
    const legalEmail = req.body.legal.lEmail;
    const legalPhone = req.body.legal.lPhone;

    const GAPhone = req.body.GAPhone;
    const GAemail = req.body.GAemail;
    const agency = req.body.nombre_agencia;

    const admin_id = req.body.admin;
    const doc_lst = req.body.docs;
    const url = req.body.url;
    const rfc = req.body.rfc;

    const documentos = [];

    doc_lst.forEach(documento => {
      documentos.push({
        nombre_documento: documento,
        url: "",
        fecha_modificacion: "",
        estatus: "Pendiente",
        comentarios: ""
      });
    });

    const proc = {
      tipo_proceso: "registroGA",
      estatus_validacion: "pendiente",

      info_GA: {
        nombres: agency,
        direccion: {
          calle: street,
          numero_exterior: exterior_num,
          numero_interior: interior_num,
          ciudad: city,
          estado: state,
          pais: country,
          codigo_postal: postalCode,
        },

        is_account_verified: false,
        url_grupo_automotriz: url,
        rfc_grupo_automotriz: rfc,
        numero_telefonico: GAPhone,
        email: GAemail,
        legal: {
          nombres: legalName,
          apellidos: legalSurname,
          email: legalEmail,
          numero_telefonico: legalPhone
        }
      },

      documentos: documentos,
      fecha_creacion: new Date(),
      usuario_ga_id: admin_id
    };

    try {
      const result = await procesos.insertOne(proc);

      const id_proceso = result.insertedId;

      return res.status(200).json({ message: "Process created", id: id_proceso });
    } catch (error) {
      return res.status(500).json({ message: "Error creating process", error: error });
    }

  }
  else {
    res.status(405).json({ message: "Incorrect request method" });
  }
}
