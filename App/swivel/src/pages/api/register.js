/*

Single Endpoint for all User Register operations across platforms.


Authors:

- Francisco Salcedo
- Ana Paula Katsuda
- Andreina Sananez
- Emiliano Cabrera
- Salvador Milanes 
- Sebastian Gonzalez
- Andrew Dunkerley

*/

import {
  User,
  SellerUser,
  ManagerUser,
  BuyerUser,
  AdminUser,
  GaEntity,
  AgencyEntity,
  SaEntity,
} from "../../models/user";
import Proceso from "../../models/procesos";

import dbConnect from "../../config/dbConnect";

import { encryptRole } from "../../utils/crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    /* Campos Requeridos de Entrada */

    const name = req.body.nombres;
    const surname = req.body.apellidos;
    const email = req.body.email;
    const role = req.body.tipo_usuario;
    const phone = req.body.numero_telefonico;

    //

    if (["gaEntity", "agencyEntity"].indexOf(role) === -1) {
      const password = req.body.password;
    }

    const encrypted_role = encryptRole(role);

    if (!/[a-zA-Z]+/.test(name)) {
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
    console.log(usedEmail);
    // email existence check within the db, returns if there is already an account with the email
    if (!usedEmail) {



      if (role === "user") {

        const street = req.body.direccion.calle;
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
          },
          documentos: [
            {
              nombre_documento: "INE",
              url: "",
              fecha_modificacion: "",
              estatus: "Pendiente",
            },
            {
              nombre_documento: "Licencia de conducir",
              url: "",
              fecha_modificacion: "",
              estatus: "Pendiente",
            },
          ],
        });
        res.status(200).json({ message: "User registered successfully" });
      }
      else if (role === "seller") {
        const agencia_id = req.body.agencia_id;

        await SellerUser.create({
          nombres: name,
          apellidos: surname,
          email: email,
          password: password,
          tipo_usuario: encrypted_role,
          agencia_id: agencia_id,
          numero_telefonico: phone,
          contar_ventas_en_proceso: 0,
          contar_ventas_completas: 0,
        });
        res.status(200).json({ message: "Seller registered successfully" });
      }
      else if (role === "agencyEntity") {

      }
      else if (role === "agencyEntity") {

        const GA = req.body.grupo_id;
        const rfc = req.body.rfc;
        const url = req.body.url;
        const email = req.body.email;
        const numero_telefonico = req.body.numero_telefonico;

        const street = req.body.direccion.calle;
        const exterior_num = req.body.direccion.numero_exterior;
        const interior_num = req.body.direccion.numero_interior;
        const city = req.body.direccion.ciudad;
        const state = req.body.direccion.estado;
        const country = req.body.direccion.pais;
        const postalCode = req.body.direccion.codigo_postal;

        const coordinate = req.body.coordinates;

        const openT = req.body.open;
        const closeT = req.body.close;

        const daysNotice = req.body.daysNotice;
        const daysMax = req.body.daysMax;


        const A = await AgencyEntity.create({
          tipo_usuario: encrypted_role,
          nombres: name,
          email: email,
          numero_telefonico: numero_telefonico,
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
          url_agencia: url,

          coordenadas_agencia: coordinate,
          horas_min: openT,
          horas_max: closeT,
          dias_anticipo: daysNotice,
          dias_max: daysMax,

          grupo_automotriz_id: GA,
        });

        res.status(200).json({ message: "Agency registered successfully" });



      }
      else if (role === "manager") {
        const GA = req.body.grupo_id;
        const A_id = req.body.agencia_id;

        await ManagerUser.create({
          tipo_usuario: encrypted_role,
          nombres: name,
          apellidos: surname,
          email: email,
          password: password,
          numero_telefonico: phone,
          grupo_automotriz_id: GA,
          agencia_id: A_id,
        });


        res.status(200).json({ message: "Manager registered successfully" });
      }
      else if (role === "admin") {
        await SaEntity.create({
          nombres: name,
          apellidos: surname,
          email: email,
          password: password,
          tipo_usuario: encrypted_role,
          numero_telefonico: phone,
          foo: "bar",
        });

        res.status(200).json({ message: "SuperAdmin registered successfully" });
      }
      else if (role === "gaEntity") {

        const rfc = req.body.rfc;
        const url = req.body.url;

        const email = req.body.email;
        const numero_telefonico = req.body.numero_telefonico;
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

        const GA = await GaEntity.create({
          tipo_usuario: encrypted_role,
          nombres: name,
          email: email,
          numero_telefonico: numero_telefonico,
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
            numero_telefonico: legalPhone,
          },
        });
        res.status(200).json({ message: "GA registered successfully" });

      }
      else if (role === "ga_admin") {

        const GAdmin = await AdminUser.create({
          tipo_usuario: encrypted_role,
          nombres: name,
          apellidos: surname,
          email: email,
          password: password,
          numero_telefonico: phone,
          grupo_automotriz_id: GA_id,
        });

        res.status(200).json({ message: "GA Admin registered successfully" });
      }
    }
    else {
      res.status(400).json({ message: "Account already exists" });
    }
  } else {
    res.status(405).json({ message: "Incorrect request method" });
  }


}

