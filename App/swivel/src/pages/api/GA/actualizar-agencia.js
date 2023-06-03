import { AgencyEntity } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { encryptRole } from "../../../utils/crypto";

/* 
manager update function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { id, phone, email, calle, num_ext, num_int, city, state, country, PC } = req.body;

    const agencyRole = encryptRole("agencia");

    await AgencyEntity.findOneAndUpdate({ _id: id, tipo_usuario: agencyRole }, { numero_telefonico: phone, email: email, direccion: { calle: calle, numero_exterior: num_ext, numero_interior: num_int, ciudad: city, estado: state, pais: country, codigo_postal: PC }}).exec()

    res.status(200).json({ message: "Agency updated" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}