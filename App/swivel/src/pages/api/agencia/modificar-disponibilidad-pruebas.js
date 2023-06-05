import { User } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
agency time update function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { agency, horas_min, horas_max, dias_anticipo, dias_max } = req.body;

    await User.findOneAndUpdate({ nombres: agency }, { horas_min: horas_min, horas_max: horas_max, dias_anticipo: dias_anticipo, dias_max: dias_max });
    
    res.status(200).json({ message: "Time constraints updated successfully" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}