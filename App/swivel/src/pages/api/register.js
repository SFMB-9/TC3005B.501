import { User, SellerUser, ManagerUser, BuyerUser } from "../../models/user";
import dbConnect from "../../config/dbConnect";

import { encryptRole } from "../../utils/crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const name = req.body.nombres;
    const surname = req.body.apellidos;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.tipo_usuario;

    const encrypted_role = encryptRole(role);

    if (!/[a-zA-Z]+ /.test(name)) {
      // regex to check name format validity, returns if non-compliant
      return res.status(400).json({ message: "wrong name format" });
    }

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

    let usedEmail = await User.findOne({ email: email });
    // email existence check within the db, returns if there is already an account with the email
    if (!usedEmail) {
      if (role === "user") {
        console.log("HOOOLA", req.body);
        const street = req.body.direccion.calle;
        const phone = req.body.numero_telefonico;
        const exterior_num = req.body.direccion.numero_exterior;
        const interior_num = req.body.direccion.numero_interior;
        const city = req.body.direccion.ciudad;
        const state = req.body.direccion.estado;
        const country = req.body.direccion.pais;
        const postalCode = req.body.direccion.codigo_postal;

        await BuyerUser.create({
          tipo_usuario: encrypted_role,
          nombres: name,
          apellidos: surname,
          email: email,
          password: password,
          numero_telefonico: phone,
          direccion: {
            calle: street,
            numero_exterior: exterior_num,
            numero_interior: interior_num,
            ciudad: city,
            estado: state,
            pais: country,
            codigo_postal: postalCode,
          }
        });
        res.status(200).json({ message: "User registered successfully" });
      } else if (role === "seller") {
        const agency = req.body.agencia_id;
        const phone = req.body.numero_telefonico;

        await SellerUser.create({
          nombres: name,
          apellidos: surname,
          email: email,
          password: password,
          tipo_usuario: encrypted_role,
          agencia_id: agency,
          numero_telefonico: phone,
        });
        res.status(200).json({ message: "Seller registered successfully" });
      } else if (role === "manager") {
        const GA = req.body.grupo_automotriz_id;
        const phone = req.body.numerqo_telefonico;

        await ManagerUser.create({
          nombres: name,
          apellidos: surname,
          email: email,
          password: password,
          tipo_usuario: encrypted_role,
          grupo_automotriz_id: GA,
          numero_telefonico: phone,
        });
        res.status(200).json({ message: "Manager registered successfully" });
      }
    } else {
      res.status(400).json({ message: "Account already exists" });
    }
  }
  else {
    res.status(405).json({ message: "Incorrect request method" });
  }  
}
