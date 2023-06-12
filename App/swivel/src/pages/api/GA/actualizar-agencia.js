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

    // const agencyRole = encryptRole("agency");

    const { _id, name, cellphone, newEmail, url } = req.body;

    await AgencyEntity.findOneAndUpdate({ _id: _id}, { numero_telefonico: cellphone, email: newEmail, url_agencia: url, nombres: name}).exec()

    res.status(200).json({ message: "Agency updated" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}