import { GaEntity, AgencyEntity, ManagerUser, SellerUser } from "../../../models/user";
import { encryptRole } from "../../../utils/crypto";
import connectToDatabase from '@/utils/mongodb';
import { ObjectId } from "mongodb";

/* 
agency details pull function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "GET") {

    const { id } = req.query;

    const client = await connectToDatabase;
    const db = client.db("test");
    const userCollection = db.collection('usuarios');


    const agencyRole = encryptRole("agencia");
    const managerRole = encryptRole("ManagerUser");
    const sellerRole = encryptRole("seller");

    const agency = await userCollection.findOne({_id : new ObjectId(id)});
    console.log(agency);
    const GA = await userCollection.findOne({_id : new ObjectId(agency.grupo_automotriz_id)}, { projection: { nombres: 1} });
    const managers = await userCollection.find({ agencia_id: id, __t: 'ManagerUser' }).toArray();
    const sellers = await userCollection.find({ agencia_id: id, __t: 'SellerUser' }).toArray();

    res.status(200).json({ agency: agency, GA: GA, managers: managers, sellers: sellers });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}