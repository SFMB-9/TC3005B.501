/* 
[H_030]

Endpoint para visualizar los documentos relacionados a
la solicitud de compra de un usuario Comprador por parte 
de un usuario Vendedor. Utilizado cuando se carga la pagina 
de solicitud de compra de usuario Vendedor.

Autor: Diego Corrales
*/

import connectToDatabase from "@/utils/mongodb";

export default async function handler(req, res) {
  const client = await connectToDatabase;
  const db = client.db("nextjs-mongodb-demo");

  if (req.method === "GET" && req.body !== null) {
    try {
      const saleProcessCollection = db.collection("proceso_venta");
      const saleProcess = await saleProcessCollection.findOne({
        _id: ObjectId(req.proceso_id),
      });

      const documentCollection = db.collection("documentos");
      const documentsList = await documentCollection.find({
        usuario_propietario_id: ObjectId(saleProcess["usuario_final_id"]),
      });

      const result = {
        documentos: documentsList,
      };

      return res
        .status(200)
        .json({
          message: "Documentos de compra recuperado exitosamente",
          result: result,
        });
    } catch (err) {
      return res
        .status(400)
        .json({
          message: "Error al recuperar documentos de compra",
          error: err,
        });
    }
  }
}
