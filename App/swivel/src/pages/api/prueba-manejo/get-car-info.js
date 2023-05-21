/* 
Diego Corrales Pinedo
15/5/2023

Endpoint to get all the data
of a given car in the db.

NOTE: Replaced by get-car-info-elastic
since cars will be stored in elastic.
*/

const mongoose = require('mongoose');
import dbConnect from "../../../config/dbConnect";
import Auto from '../../../models/auto';

export default async (req, res) => {
    const _id = req.query._id;

    await dbConnect();
      
    try {
        // Find the car specific to the given id
        const auto = await Auto.findById(_id);

      res.status(200).json({ auto }, { message: 'Se ha encontrado el auto'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };


