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

        const proceso_id = req.body._id;
        const new_status = req.body.status
        //seller id and type are passed as query parameters
      
        await dbConnect();
    
        try {
        // Find the processes that belong to the seller and are of a specific type
        const proc = await Proceso.findById(proceso_id);
        proc.status = new_status;
        await proc.save();
        res.status(200).json({ status: 'status of ' + proceso_id + ' updated to ' + new_status});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };
