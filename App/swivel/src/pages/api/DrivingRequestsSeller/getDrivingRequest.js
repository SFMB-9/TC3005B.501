const mongoose = require('mongoose');
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

//import {getSession} from 'next-auth/client'

export default async (req, res) => {
        /*
        //idk if sessions work so in the meantime I'll just use the user id
        const session = await getSession({ req })
        const user = session.get('user');
        */

        const _id = req.query._id;
        //seller id and type are passed as query parameters
      
        await dbConnect();
      
        try {
        // Find the processes that belong to the seller and are of a specific type
        const proceso = await Proceso.findById(_id);

      res.status(200).json({ proceso }, { status: 'Se ha encontrado el proceso'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };


