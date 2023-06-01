import { AgencyEntity } from "@/models/user";
import dbConnect from "@/config/dbConnect";

// Creates new agency
export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const { agency } = req.body;

    const newAgency = new AgencyEntity(agency);

    newAgency.save((err, agency) => {
      if (err) {
        res.status(500).json({ message: "Error al crear la agencia" });
      } else {
        res.status(200).json({ message: "Agencia creada exitosamente", agency: agency });
      }
    });
  } else {
    res.status(405).json({ message: "Wrong request method" });
  }
}
