/* 
Diego Corrales Pinedo
15/5/2023

Endpoint to get all the data
of a given user in the db.
*/

import connectToDatabase from '@/utils/mongodb'
// import dbConnect from "../../../config/dbConnect";
// import Usuario from '../../../models/usuario';
import { ObjectId } from "mongodb";
import { encryptRole } from '@/utils/crypto';

export default async (req, res) => {
    const user_id = req.query._id;
    const nombre_agencia = req.query.agency_name;

    const client = await connectToDatabase;
    const db = client.db("test");
    const userCollection = db.collection('usuarios');

    try {
      // Find the user specific to the given id
      const user = await userCollection.findOne({_id : new ObjectId(user_id)});

      // Find the agency specific to the given name
      const manager = await userCollection.findOne({ nombres: nombre_agencia, tipo_usuario: encryptRole("agencia") });

      res.status(200).json({ user, manager }, { status: 'Se ha encontrado el usuario'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};

