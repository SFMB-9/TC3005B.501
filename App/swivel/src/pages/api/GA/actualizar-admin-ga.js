import { AdminUser } from "../../../models/user";
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

    const { name, last_name, newEmail, cellphone, _id } = req.body;

    console.log("id: ", _id);
    const result = await AdminUser.findOneAndUpdate({ _id: _id}, { nombres: name, apellidos: last_name, email: newEmail, numero_telefonico: cellphone });
    console.log("the result", result);
    console.log("The body", req.body);
    res.status(200).json({ message: "User details updated successfully" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}