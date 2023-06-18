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
    const userCollection = db.collection('usuarios');

    try {
      // Find the user specific to the given id
      const user = await userCollection.findOne({_id : new ObjectId(user_id)});

      if (!user) {
        res.status(405).json({ message: 'Usuario con id ' + user_id + 'no encontrado'});
      }

      // Check if the user has a grupo_automotriz_id
      if (!user.grupo_automotriz_id) {
        res.status(200).json( { hasGrupoAutomotrizId: false } );
      } else {
        res.status(200).json( { hasGrupoAutomotrizId: true } );
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};

