const mongoose = require("mongoose");
import dbConnect from "../../../config/dbConnect";
const Proceso = require("../../../models/procesos");



export default async (req, res) => {
  
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
  const _id = req.query._id;

  
  dbConnect();
  

  try {

    const proceso = await Proceso.findById(_id);


    if (!proceso) {
      return res.status(404).json({ message: "No se encontro el proceso" });
    }

    console.log(proceso)

    res.status(200).json({ proceso, message: "Se ha encontrado el proceso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
