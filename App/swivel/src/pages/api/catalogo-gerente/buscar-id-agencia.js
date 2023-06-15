/* 
Diego Corrales Pinedo
4/6/23
Endpoint to find the id of an agency
related to the given id of a manager.
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
        // Find the user specific to the given id and get their agency id
        const user = await userCollection.findOne(
            {_id : new ObjectId(user_id)},
            {projection: {agencia_id: 1}});

        if (!user) {
            res.status(404).json({ message: 'No se encontro el usuario'});
        }

        const agencyinfo = await userCollection.findOne({
            _id: new ObjectId(user.agencia_id)
        })

      res.status(200).json({ agencyinfo }, { status: 'Se ha encontrado el ID de agencia'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};
