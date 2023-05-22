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

        await dbConnect();
      
        console.log("Nombre: " + nombre_agencia);

        try {
        // Find the car specific to the given id
        const user = await Usuario.findOne({ "agencia": nombre_agencia, "tipo_usuario": "gerente" });

      res.status(200).json({ user }, { status: 'Se ha encontrado el usuario gerente'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };


