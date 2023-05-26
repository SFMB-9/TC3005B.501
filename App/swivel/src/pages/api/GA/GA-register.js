import { AdminUser, GaEntity } from "../../models/user";
import { GaProceso } from "../../models/procesos";
import dbConnect from "../../config/dbConnect";

import { encryptRole } from "../../utils/crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const agency = req.body.nombre_agencia;
    const name = req.body.nombres;
    const surname = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.numero_telefonico;
    const roleAdmin = req.body.tipo_usuario;
    const roleGA = req.body.tipo_usuario;
    const rfc = req.body.rfc;
    const url = req.body.url

    const encrypted_GA = encryptRole(roleGA)
    const encrypted_admin = encryptRole(roleAdmin)

    if (!/[\w\.-]+@([\w-]+\.)+[\w-]{2,4}/.test(email)) {
      // regex to check email format validity, returns if non-compliant
      return res.status(400).json({ message: "wrong email format" });
    }

    let ping = require("ping");

    ping.sys.probe(email, function (isAlive) {
      // email existence validation, pings the email and returns if non-existent
      isAlive
        ? function () {
            // continue
          }
        : function () {
            return res.status(400).json({ message: "Email is invalid" });
          };
    });

    let usedEmail = await GaEntity.findOne({ email: email });
    // email existence check within the db, returns if there is already an account with the email
    if (!usedEmail) {
      const street = req.body.direccion.calle;
      const exterior_num = req.body.direccion.numero_exterior;
      const interior_num = req.body.direccion.numero_interior;
      const city = req.body.direccion.ciudad;
      const state = req.body.direccion.estado;
      const country = req.body.direccion.pais;
      const postalCode = req.body.direccion.codigo_postal;

      const GA = await GaEntity.create({
        tipo_usuario: encrypted_GA,
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
        rfc_grupo_automotriz: rfc
      });

      const GA_id = GA._id.toString();

      const GAdmin = await GaEntity.create({
        tipo_usuario: encrypted_admin,
        nombres: name,
        apellido: surname,
        email: email,
        password: password,
        numero_telefonico: phone,
        grupo_automotriz_id: GA_id
      });

      const GAdmin_id = GAdmin._id.toString();

      await GaProceso.create({
        tipo_proceso: "peticionGA",
        estatus: "pendiente",

        direccion: {
          calle: street,
          numero_exterior: exterior_num,
          numero_interior: interior_num,
          ciudad: city,
          estado: state,
          pais: country,
          codigo_postal: postalCode,
        },

        fecha_inicio: new Date(),
        solicitud_cancelada: false,

        //superadmin_id: String, <-- how do we define this, from here or does it get assigned after the process id greenlit (by a SA)?
        grupo_automotriz_id: GA_id,
        grupo_automotriz: agency,
        usuario_final_id: GAdmin_id
      });

      res.status(200).json({ message: "User registered successfully" });      
    } 
    else {
      res.status(400).json({ message: "Account already exists" });
    }
  }
  else {
    res.status(405).json({ message: "Incorrect request method" });
  }  
}
