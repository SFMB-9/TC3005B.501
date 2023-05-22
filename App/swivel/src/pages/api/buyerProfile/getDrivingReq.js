
const Proceso = require("../../../models/procesos");
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  if (req.method === "GET") {
    dbConnect();

    const user_id = req.query.user_id;
    const drivingReqs = await Proceso.find({
      usuario_final_id: user_id,
      tipo_proceso: "pruebaManejo",
    });

    res.status(200).json(drivingReqs);
    return;
  }
}
