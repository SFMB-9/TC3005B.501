import mongoose from 'mongoose';
const Usuario = require('../../../models/usuario');
import dbConnect from "../../../config/dbConnect";

const handler = async (req, res) => {

  if(req.method !== 'PUT'){
    return res.status(405).json({message: 'Metodo no permitido'})
  }

  // Receive details of the purchase and manager ID
  const { gerente_id } = req.query;
  // Connect to the MongoDB database using Mongoose
  await dbConnect();

  try {

    // Find the seller with the lowest number of unfinished sales under the given manager ID
    const result = await Usuario
      .find({ "gerente_id": gerente_id, "contar_ventas_en_proceso": { $exists: true, $lt: Infinity } })
      .sort({ "contar_ventas_en_proceso": 1 })
      .limit(1, { _id: 0, _id: 1 })
      .lean()
      .exec();

    // If no seller is found, respond with an error message
    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const sellerId = result[0]._id;
    // Update the seller's document to reflect the new purchase
    await Usuario.updateOne({ "_id": sellerId }, { $inc: { "contar_ventas_en_proceso": 1 } });

    // Respond with a success message
    res.status(200).json({ message: 'Compra asignada correctamente', sellerId });
  } catch (error) {
    console.error(error);
    // Respond with an error message
    res.status(500).json({ message: error });
  } 
};

export default handler;
