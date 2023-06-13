import connectToDatabase from "@/utils/mongodb";

export default async function handler(req, res) {
    const client = await connectToDatabase;
    const db = client.db("test");

    const grupo_automotriz_id = req.query.grupo_automotriz_id;

    if (req.method === "GET") {
        try {
            let result = await db.collection("procesos").find({
                tipo_proceso: "registroAgencia",
                estatus_validacion: "pendiente",
                grupo_automotriz_id: grupo_automotriz_id
            }).toArray();

            if (result.length === 0) {
                return res.status(404).json({ message: "No se encontraron procesos" });
            }
            if (!result) {
                return res.status(500).json({ message: "Error al buscar procesos" });
            }

            return res.status(200).json({ result: result, message: "Procesos encontrados" });
        } catch (err) {
            return res.status(400).json({ message: "Error al buscar procesos", error: err.message });
        }
    } else {
        res.status(400).json({ message: "Wrong request method" });
    }
}
