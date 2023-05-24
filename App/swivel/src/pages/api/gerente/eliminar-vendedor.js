import { SellerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
seller removal function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    dbConnect();

    const { email, agency } = req.query;
    
    const result = await SellerUser.deleteOne({ email: email, agencia: agency });

    if(result.deletedCount > 0) {
        res.status(200).json({ message: "User deleted successfully" });    
    }
    else {
        res.status(400).json({ message: "User not found" });
    }
  }
  else {
    res.status(405).json({ message: "Wrong request method" });
  }
}