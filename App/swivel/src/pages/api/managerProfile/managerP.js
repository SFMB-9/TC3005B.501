const { User } = require("../../../models/user");
import dbConnect from "../../../config/dbConnect";
import { ObjectId } from "mongodb";
//will change this when sessions are implemented
//import {getSession} from 'next-auth/client'

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Metodo no permitido" });
  }

  const { id } = req.query;

  console.log("ID: "+id);
  dbConnect();

  try {

    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario encontrado", userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
  // finally {
  //   // mongoose.disconnect();
  //   // setTimeout(() => {
  //   //   mongoose.disconnect();
  //     console.log("Desconectado de MongoDB");
  //   // }, 1000);
  // }
  // mongoose.disconnect();
};
