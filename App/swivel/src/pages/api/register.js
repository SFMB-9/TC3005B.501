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

import { User, SellerUser, ManagerUser, BuyerUser, AdminUser, GaEntity, AgencyEntity, SaEntity } from "../../models/user";
import Proceso from "../../models/procesos";

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
    const phone = req.body.numero_telefonico;
    let entity = false


    if (req.body.hasOwnProperty('tipo_entidad')) {
    entity = req.body.tipo_entidad;
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
              estatus: "Pendiente"
            },
            {
              nombre_documento: "Licencia de conducir",
              url: "",
              fecha_modificacion: "",
              estatus: "Pendiente"
            }
          ],
        });
        res.status(200).json({ message: "User registered successfully" });
      } else if (role === "seller") {

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
          contar_ventas_completas: 0
        });
        res.status(200).json({ message: "Seller registered successfully" });
      } else if (role === "manager") {

        const GA =  req.body.grupo_id;

         if(entity){

                const agencyName = req.body.nombreAgencia;

      const url = req.body.url

      const street = req.body.direccion.calle;
      const exterior_num = req.body.direccion.numero_exterior;
      const interior_num = req.body.direccion.numero_interior;
      const city = req.body.direccion.ciudad;
      const state = req.body.direccion.estado;
      const country = req.body.direccion.pais;
      const postalCode = req.body.direccion.codigo_postal;

      const coordinate = req.body.coordinates;

      const openT = req.body.open;
      const closeT= req.body.close;

      const daysNotice = req.body.daysNotice;
      const daysMax = req.body.daysMax;
      




      const A = await AgencyEntity.create({

        tipo_usuario: encryptRole(entity),
        nombres: agencyName,
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


        /*coordenadas_agencia: coordinate,*/
        horas_min: openT,
        horas_max: closeT,
        dias_anticipo: daysNotice,
        dias_max: daysMax,

        grupo_automotriz_id: GA

      });

      const A_id = A._id.toString();

      const AManager = await ManagerUser.create({
        tipo_usuario: encrypted_role,
        nombres: name,
        apellidos: surname,
        email: email,
        password: password,
        numero_telefonico: phone,
        grupo_automotriz_id: GA,
        agencia_id: A_id
      });

      const AManager_id = AManager._id.toString();

      const list = ["licencia","ine","comprobante_domicilio"] // SA_012 - replace hardcode!
      const documentos = [];

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
      }

      const AProc = await Proceso.create({
        tipo_proceso: "peticionA",
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

        documentos: documentos,

        fecha_inicio: new Date(),
        solicitud_cancelada: false,

        grupo_automotriz_id: GA,
        agencia_id: A_id,
        usuario_final_id: AManager_id
      })

      } else {

        const A_id = req.body.agencia_id;

        await ManagerUser.create({
        tipo_usuario: encrypted_role,
        nombres: name,
        apellidos: surname,
        email: email,
        password: password,
        numero_telefonico: phone,
        grupo_automotriz_id: GA,
        agencia_id: A_id
      });



         }

        res.status(200).json({ message: "Manager registered successfully" });
      



      } else if (role==="admin") {

        

        await SaEntity.create({

          nombres:name,
          apellidos:surname,
          email:email,
          password:password,
          tipo_usuario: encrypted_role,
          numero_telefonico:phone,
          foo:"bar"

        });


        res.status(200).json({ message: "SuperAdmin registered successfully" });
      } else if (role==="ga_admin"){

        if(entity){

      const agency = req.body.nombre_GA;
      const name = req.body.nombres;
      
      
      const rfc = req.body.rfc;
      const url = req.body.url

      const street = req.body.direccion.calle;
      const exterior_num = req.body.direccion.numero_exterior;
      const interior_num = req.body.direccion.numero_interior;
      const city = req.body.direccion.ciudad;
      const state = req.body.direccion.estado;
      const country = req.body.direccion.pais;
      const postalCode = req.body.direccion.codigo_postal;

      const legalName = req.body.legal.lNombres
      const legalSurname = req.body.legal.lApellidos
      const legalEmail = req.body.legal.lEmail
      const legalPhone = req.body.legal.lPhone


      const GA = await GaEntity.create({
        tipo_usuario: encryptRole(entity),
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
      });

      const GA_id = GA._id.toString();

      const GAdmin = await AdminUser.create({
        tipo_usuario: encrypted_role,
        nombres: name,
        apellidos: surname,
        email: email,
        password: password,
        numero_telefonico: phone,
        grupo_automotriz_id: GA_id
      });

      const GAdmin_id = GAdmin._id.toString();

      const list = ["licencia","ine","comprobante_domicilio"] // SA_012 - replace hardcode!
      const documentos = [];

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
      }

      const GAProc = await Proceso.create({
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

        documentos: documentos,

        fecha_inicio: new Date(),
        solicitud_cancelada: false,

        grupo_automotriz_id: GA_id,
        grupo_automotriz: agency,
        usuario_final_id: GAdmin_id
      })

      } else {

        const GA_id = req.body.ga_id;

        await AdminUser.create({
        tipo_usuario: encrypted_role,
        nombres: name,
        apellidos: surname,
        email: email,
        password: password,
        numero_telefonico: phone,
        grupo_automotriz_id: GA_id 
      });

      }

      res.status(200).json({ message: "GA Admin registered successfully" });

      } else {
      res.status(400).json({ message: "Account already exists" });
    }
  }
  else {
    res.status(405).json({ message: "Incorrect request method" });
  }}
}
