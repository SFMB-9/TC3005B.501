import { AgencyEntity } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { encryptRole } from "../../../utils/crypto";

/* 
Pulls all agencies depending on filters
Recieves: request object, response object
Returns: response status and json 
*/

export default async function handler(req, res) {
  if (req.method === "GET") {
    dbConnect();

    const filters = req.query; // In queries add the desired filters

    //const agencyRole = encryptRole("agencia");

    const agency = await AgencyEntity.findAll({
      tipo_usuario: "agencia", //change to tipo_usuario: agencyRole
      ...filters,
    }).exec();

    res.status(200).json({ agency: agency });
  } else {
    res.status(405).json({ message: "Wrong request method" });
  }
}
