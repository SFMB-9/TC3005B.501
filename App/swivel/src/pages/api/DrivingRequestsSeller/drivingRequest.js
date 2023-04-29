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

        const vendedor_id = req.query.vendedor_id;
        const tipo_proceso = req.query.tipo_proceso;
        //seller id and type are passed as query parameters
      
        await dbConnect();
      
    
        try {
        // Find the processes that belong to the seller and are of a specific type
        const procesos = await Proceso.find({vendedor_id:vendedor_id, tipo_proceso:tipo_proceso});

      res.status(200).json({ procesos }, { status: 'success'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } 
  };


