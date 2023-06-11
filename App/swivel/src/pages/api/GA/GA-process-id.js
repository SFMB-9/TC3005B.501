/*
Diego Corrales Pinedo
11/06/2023

Endpoint to determine whether or not a given GA
user has a grupo_automotriz_id, meaning they have
been validated as GA.
*/

import connectToDatabase from '@/utils/mongodb'
import { ObjectId } from "mongodb";

export default async (req, res) => {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' });
    }
  
    const user_id = req.query._id;

    const client = await connectToDatabase;
    const db = client.db("test");
    const processCollection = db.collection('procesos');

    try {
      // Find the process specific to the given user
      const process = await processCollection.findOne({
            $and: [
                {usuario_ga_id : user_id},
                {estatus_validacion : "pendiente"}
            ]
        });

      if (!process) {
        res.status(405).json({ message: 'Proceso GA para usuario con id ' + user_id + 'no encontrado'});
      }

      res.status(200).json({ process }, { message: "Porceso encontrado exitosamente" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};

