
const { Proceso } = require("../../../models/procesos");
import dbConnect from "../../../config/dbConnect";

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Metodo no permitido" });
  }

  const { id } = req.query;
  dbConnect();
 
  try {
    const proceso_GA = await Proceso.find({ usuario_ga_id: id });

    if (!proceso_GA) {
        return false;
    }
    res.status(200).json({ message: "Usuarios encontrados", userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};