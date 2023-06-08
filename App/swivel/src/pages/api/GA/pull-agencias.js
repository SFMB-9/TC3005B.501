import connectToDatabase from "@/utils/mongodb";
// import { encryptRole } from "../../../utils/crypto";

/* 
Pulls all agencies depending on filters
Recieves: request object, response object
Returns: response status and json 

Pending filters
*/

export default async function handler(req, res) {
  const client = await connectToDatabase;
  const db = client.db("test");

  // const { role, GA } = req.query;
  const tipo_usuario = req.query.tipo_usuario;
  const grupo_automotriz_id = req.query.grupo_automotriz_id;

  if (req.method === "GET") {
    try {
      let result = await db.collection("usuarios").find({
        tipo_usuario: tipo_usuario,
        grupo_automotriz_id: grupo_automotriz_id
      }).toArray();
      if (result.length === 0) {
        return res.status(404).json({ message: "No se encontraron agencias" });
      }
      if (!result) {
        return res.status(500).json({ message: "Error al buscar agencias" });
      }
      // const encryptedRole = encryptRole(role)
       return res.status(200).json({result: result, message: "Agencias encontradas" });
    } catch (err) {
      return res.status(400).json({ message: "Error al buscar agencias", error: err.message });
    }
  } else {
    res.status(400).json({ message: "Wrong request method" });
  }
}