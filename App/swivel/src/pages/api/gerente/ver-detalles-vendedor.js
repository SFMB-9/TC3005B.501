import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
seller details pull function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "GET") {
    dbConnect();

    const { email, agency } = req.body;

    const result = await User.findOne({ email: email, agencia: agency }, "nombres apellidos email telefono");

    res.status(200).json(result);
    
  }
  else{
    res.status(400).json({ message: "Wrong request method" });
  }
}