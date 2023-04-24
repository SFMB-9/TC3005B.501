/*
H_023 Endpoint de subir documento como Usuario Grupo Automotriz

@catlikeflyer
*/

import connectToDatabase from "@/utils/mongodb";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "GET" && req.body !== null) {
    try {
      const session = await getSession({ req });
      const userId = session.user.user_id;

      const docCollection = db.collection("documentos");
      const docs = await docCollection.find({
        usuario_propietario_id: ObjectId(userId),
      });

      const result = {
        documentos: docs,
      };

      return res
        .status(200)
        .json({
          message: "Documentos del usuario recuperados exitosamente",
          result: result,
        });
    } catch (err) {
      return res
        .status(400)
        .json({
          message: "Error al recuperar documentos del usuario",
          error: err,
        });
    }
  }
}
