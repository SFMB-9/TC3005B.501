import { AgencyEntity } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { agency, data } = req.body;

    try {
      const agencyEntity = await AgencyEntity.findById(agency);
      if (!agencyEntity) {
        return res.status(404).json({ message: "Agency not found" });
      }

      agencyEntity.documentos_requeridos_compra = data;
      await agencyEntity.save();

      res.status(200).json({ message: "Documents updated successfully" });
    } 
    catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Wrong request method" });
  }
}