import { AdminUser, GaEntity } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

import { encryptRole } from "../../../utils/crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const name = req.body.nombres;
    const surname = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.numero_telefonico;
    const roleAdmin = req.body.tipo_usuario;
    console.log(roleAdmin);
    const encrypted_admin = encryptRole(roleAdmin);

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
      
      const GA_id = GA._id.toString();

      await AdminUser.create({
        tipo_usuario: encrypted_admin,
        nombres: name,
        apellido: surname,
        email: email,
        password: password,
        numero_telefonico: phone,
        grupo_automotriz_id: GA_id
      });

      res.status(200).json(GAProc._id.toString());      
    } 
    else {
      res.status(400).json({ message: "Account already exists" });
    }
  }
  else {
    res.status(405).json({ message: "Incorrect request method" });
  }  
}
