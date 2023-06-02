import connectToDatabase from "@/utils/mongodb";
import { encryptRole } from "../../../utils/crypto";

/* 
Pulls all agencies depending on filters
Recieves: request object, response object
Returns: response status and json 
*/

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { db } = await connectToDatabase();
    const { role, GA } = req.query;

    const encryptedRole = encryptRole(role);

    const agencies = await db
      .collection("usuarios")
      .find({ role: role, grupo_automotriz: GA }) // change to role: encryptedRole
      .toArray();
    res.status(200).json(agencies);
  } else {
    res.status(405).json({ message: "Wrong request method" });
  }
}
