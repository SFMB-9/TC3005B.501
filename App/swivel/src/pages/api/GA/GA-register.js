import Proceso from "../../../models/procesos";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

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
    const agency = req.body.nombre_agencia;

    const admin_id = req.body.admin;
    const doc_lst = req.body.docs;
    const url = req.body.url;
    const rfc = req.body.rfc;

    const documentos = [];

    doc_lst.forEach(elem => {
      const nombre_documento = elem;
      const url = "";
      const estatus = "";
      const comentarios = "";
      const fecha_modificacion = null;

      documentos.push({
        nombre: nombre_documento,
        url: url,
        estatus: estatus,
        comentarios: comentarios,
        fecha_modificacion: fecha_modificacion,
      });
    }); 

    const proc = await Proceso.create({
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

        legal: {
          nombres: legalName,
          apellidos: legalSurname,
          email: legalEmail,
          numero_telefonico: legalPhone
        }
      },

      documentos: documentos,

      fecha_solicitud: new Date(),
      solicitud_cancelada: false,
      numero_telefonico: GAPhone,

      usuario_ga_id: admin_id
    }); 

    res.status(200).json({ message: "Process created", info: proc._id.toString() });
  }
  else {
    res.status(405).json({ message: "Incorrect request method" });
  }  
}
