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

    const { _id, name, last_name, newEmail, cellphone } = req.body;

    const managerRole = encryptRole("manager");

    await ManagerUser.findOneAndUpdate({ _id: _id, tipo_usuario: managerRole }, { nombres: name, apellidos: last_name, email: newEmail, numero_telefonico: cellphone }).exec()

    res.status(200).json({ message: "Gerente actualizado correctamente" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}