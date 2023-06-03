import { ManagerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { encryptRole } from "../../../utils/crypto";

/* 
manager deletion function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    dbConnect();

    const { id } = req.body;

    const managerRole = encryptRole("manager");

    await ManagerUser.findOneAndDelete({ _id: id, tipo_usuario: managerRole }).exec()

    res.status(200).json({ message: "Manager deleted" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}