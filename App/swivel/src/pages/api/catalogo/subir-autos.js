// Upload cars to the database
import connectToDatabase from "@/utils/mongodb";

// Nice to haves:
// - Validar que el usuario que sube el auto es un agente de la agencia
// - Validar que los datos que sube el usuario no vengan en blanco

export default async function handler(req, res) {
  const client = await connectToDatabase;
  const db = client.db("nextjs-mongodb-demo");

  if (req.method === "POST" && req.body !== null) {
    try {
      let auto = {
        //auto_id: req.body.auto_id,
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,
        precio: req.body.precio,
        color: req.body.color,
        combustible: req.body.combustible,
        disponibilidad: req.body.disponibilidad,
        motor: req.body.motor,
        agencia_id: req.body.agencia_id,
        tipo_vehiculo: req.body.tipo_vehiculo,
        // Falta agregar el campo de imagenes
      };

      let result = await db.collection("posts").insertOne(auto);

      if (!result) {
        return res.status(500).json({ message: "Error al subir auto" });
      }

      return res
        .status(200)
        .json({ message: "Auto agregado exitosamente", result: result });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error al subir auto", error: err });
    }
  }
}
