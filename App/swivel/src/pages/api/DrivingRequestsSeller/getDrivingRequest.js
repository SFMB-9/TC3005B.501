const mongoose = require("mongoose");
import dbConnect from "../../../config/dbConnect";
const Proceso = require("../../../models/procesos");

//import {getSession} from 'next-auth/client'

export default async (req, res) => {
  /*
        //idk if sessions work so in the meantime I'll just use the user id
        const session = await getSession({ req })
        const user = session.get('user');
        */
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
  const _id = req.query._id;

  //seller id and type are passed as query parameters

  await dbConnect();

  try {
    // Find the processes that belong to the seller and are of a specific type
    const proceso = await Proceso.findById(_id);

    if (!proceso) {
      return res.status(404).json({ message: "No se encontro el proceso" });
    }

    res.status(200).json({ proceso, message: "Se ha encontrado el proceso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
