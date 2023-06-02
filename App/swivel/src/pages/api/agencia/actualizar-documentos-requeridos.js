import AgencyEntity from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
agency documents update function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { agency, data } = req.body;

    await AgencyEntity.findOneAndUpdate({ nombres: agency }, { documentos_requeridos_agencia: data });
    
    res.status(200).json({ message: "Time constraints updated successfully" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}