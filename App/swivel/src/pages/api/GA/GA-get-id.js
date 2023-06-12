/* 
Diego Corrales Pinedo
10/6/23
Endpoint to find the id of a GA
related to a GA admin user.
*/

import connectToDatabase from '@/utils/mongodb';
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
        // Find the user specific to the given id and get their GA id
        const user = await userCollection.findOne(
            {_id : new ObjectId(user_id)},
            {projection: {grupo_automotriz_id: 1}});

        if (!user) {
            res.status(404).json({ message: 'No se encontro el usuario'});
        }
      res.status(200).json({ user }, { status: 'Se ha encontrado el ID de GA'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};
