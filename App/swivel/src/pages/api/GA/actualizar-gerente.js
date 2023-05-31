import { ManagerUser } from "../../../models/user";
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

    const { id, name, surname, email, phone } = req.body;

    const managerRole = encryptRole("manager");

    await ManagerUser.findOneAndUpdate({ _id: id, tipo_usuario: managerRole }, { nombres: name, apellidos: surname, email: email, numero_telefonico: phone }).exec()

    res.status(200).json({ message: "Manager updated" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}