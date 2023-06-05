// const Usuario = require("../../../models/usuario");
const { User } = require("../../../models/user");
import dbConnect from "../../../config/dbConnect";
//will change this when sessions are implemented
//import {getSession} from 'next-auth/client'

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Metodo no permitido" });
  }

  const { id } = req.query;
  dbConnect();
 
  try {
    const userData = await User.find({ grupo_automotriz_id: id });

    if (!userData) {
      return res.status(404).json({ message: "Usuarios no encontrados" });
    }
    res.status(200).json({ message: "Usuarios encontrados", userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};