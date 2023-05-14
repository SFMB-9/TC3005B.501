/* 
Author: Diego Corrales, Andrew Dunkerley
Date: 5/7/23
Endpoint to assign a seller with the lowest
concurrent process number to a driving test.
Adapted from api/SaleManagement/saleM, orignally 
created by Andrew.
*/

const mongoose = require('mongoose');
import Auto from "../../../models/auto";
import Usuario from "../../../models/usuario";
import dbConnect from "../../../config/dbConnect";

export default async (req, res) => {
  // Receive details of the purchase and manager ID
  const autoId = req.body._id;

  // Connect to the MongoDB database using Mongoose
  dbConnect();

  try {
    const carData = await Auto.findById(req.body._id);
    const gerente_id = carData["gerente_id"];

    // Find the seller with the lowest number of unfinished sales under the given manager ID
    const result = await Usuario
      .find({ "gerente_id": gerente_id, "contar_ventas_en_proceso": { $exists: true, $lt: Infinity } })
      .sort({ "contar_ventas_en_proceso": 1 })
      .limit(1, { _id: 0, _id: 1 })
      .lean()
      .exec();
    const sellerId = result[0]._id;

    // Respond with a success message
    res.status(200).json({ message: 'Vendedor conseguido exitosamente', sellerId });
  } catch (error) {
    console.error(error);
    // Respond with an error message
    res.status(500).json({ message: error.message });
  }
};
