import connectToDatabase from "../../../utils/mongodb";
import { ObjectId } from "mongodb";

//import {getSession} from 'next-auth/client'

export default async (req, res) => {
  const client = await connectToDatabase;
  const db = client.db("test");

  const procesos_collection = await db.collection("procesos");

  /*
        //idk if sessions work so in the meantime I'll just use the user id
        const session = await getSession({ req })
        const user = session.get('user');
        */
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Metodo no permitido" });
  }

  const vendedor_id = req.query.vendedor_id;
  const tipo_proceso = req.query.tipo_proceso;
  console.log(vendedor_id);
  console.log(tipo_proceso);
  //seller id and type are passed as query parameters

  try {

    let procesos = []

    if (tipo_proceso === "solicitudCompra") {
      procesos = await procesos_collection.find({ "vendedor._id": new ObjectId(vendedor_id), "tipo_proceso": tipo_proceso }).toArray();
    } else {
      procesos = await procesos_collection.find({ "tipo_proceso": tipo_proceso }).toArray();
    }

    if (procesos.length === 0) {
      return res.status(404).json({ message: "No se encontraron procesos" });
    }

    res.status(200).json({ procesos, message: "Se encontraron los procesos" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
