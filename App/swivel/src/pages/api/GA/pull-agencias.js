import connectToDatabase from "@/utils/mongodb";
import { encryptRole } from "../../../utils/crypto";

/* 
Pulls all agencies depending on filters
Recieves: request object, response object
Returns: response status and json 

Pending filters
*/

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = await connectToDatabase;
    const db = client.db("test");
    const { role, GA } = req.query;

    const encryptedRole = encryptRole(role);

    const agencies = await db
      .collection("usuarios")
      .find({ role: encryptedRole, grupo_automotriz: GA }) // change to role: encryptedRole
      .toArray();
    res.status(200).json(agencies);

  } else {
    res.status(400).json({ message: "Wrong request method" });
  }
}
