import { GaEntity, AgencyEntity, ManagerUser, SellerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { encryptRole } from "../../../utils/crypto";

/* 
agency details pull function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "GET") {
    dbConnect();

    const { id } = req.query;

    const agencyRole = encryptRole("agencia");
    const managerRole = encryptRole("manager");
    const sellerRole = encryptRole("seller");

    const agency = await AgencyEntity.findOne({ _id: id, tipo_usuario: agencyRole }).exec();
    const GA = await GaEntity.findOne({ _id: agency.grupo_automotriz_id }, "nombres").exec();
    const managers = await ManagerUser.find({ agencia_id: id, tipo_usuario: managerRole }, "_id nombres apellidos email numero_telefonico").exec()
    const sellers = await SellerUser.find({ agencia_id: id, tipo_usuario: sellerRole }, "-_id nombres apellidos email numero_telefonico").exec()

    res.status(200).json({ agency: agency, managers: managers, sellers: sellers, GA: GA });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}