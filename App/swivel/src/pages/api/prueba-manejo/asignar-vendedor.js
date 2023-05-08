/* 
Author: Diego Corrales, Andrew Dunkerley
Date: 5/7/23
Endpoint to assign a seller with the lowest
concurrent process number to a driving test.
Adapted from api/SaleManagement/saleM, orignally 
created by Andrew.
*/

import mongoose from 'mongoose';
const Usuario = require('../../../models/usuario');
import dbConnect from "../../../config/dbConnect";

export default async (req, res) => {
  // Receive details of the purchase and manager ID
  const gerente_id = req.body._id;

  console.log("Gerente ID: " + gerente_id);

  // Connect to the MongoDB database using Mongoose
  //dbConnect();

  try {
    // Find the seller with the lowest number of unfinished sales under the given manager ID
    const result = await Usuario
      .find({ "gerente_id": gerente_id, "contar_ventas_en_proceso": { $exists: true, $lt: Infinity } })
      .sort({ "contar_ventas_en_proceso": 1 })
      .limit(1, { _id: 0, _id: 1 })
      .lean()
      .exec();
    const sellerId = result[0]._id;
    // Update the seller's document to reflect the new purchase
    await Usuario.updateOne({ "_id": sellerId }, { $inc: { "contar_ventas_en_proceso": 1 } });

    console.log("Seller ID: " + sellerId);

    // Respond with a success message
    res.status(200).json({ message: 'Compra asignada correctamente', sellerId });
  } catch (error) {
    console.error(error);
    // Respond with an error message
    res.status(500).json({ message: error });
  } finally {
    // Close the Mongoose connection
    await mongoose.disconnect();
  }
};
