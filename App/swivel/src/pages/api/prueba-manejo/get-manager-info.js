/* 
Diego Corrales Pinedo
19/5/2023

Endpoint to get all the data
of a given manager user in the db.
*/

const mongoose = require('mongoose');
import dbConnect from "../../../config/dbConnect";
import Usuario from '../../../models/usuario';

export default async (req, res) => {
    const nombre_agencia = req.query.agency_name;

    try {
      await dbConnect();

      // Find the user specific to the given agency name
      const user = await Usuario.findOne({ nombres: nombre_agencia, tipo_usuario: "agencia" }).exec();
      // console.log("Manager data: " + JSON.stringify(user));

      res.status(200).json({ user }, { status: 'Se ha encontrado la info de la agencia'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } finally {
      await mongoose.disconnect();
    }
};


