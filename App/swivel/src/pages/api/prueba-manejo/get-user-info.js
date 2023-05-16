const mongoose = require('mongoose');
import dbConnect from "../../../config/dbConnect";
import Usuario from '../../../models/usuario';

export default async (req, res) => {
        const _id = req.query._id;

        await dbConnect();
      
        try {
        // Find the car specific to the given id
        const user = await Usuario.findById(_id);

      res.status(200).json({ user }, { status: 'Se ha encontrado el usuario'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };


