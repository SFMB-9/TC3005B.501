import { ManagerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { encryptRole } from "../../../utils/crypto";

/* 
agency details pull function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "GET") {
    dbConnect();

    const { id } = req.query;

    const managerRole = encryptRole("manager");

    const manager = await ManagerUser.find({ _id: id, tipo_usuario: managerRole }, "_id nombres apellidos email numero_telefonico").exec()

    res.status(200).json({ manager: manager });
    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}