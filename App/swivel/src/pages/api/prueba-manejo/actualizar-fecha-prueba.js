const mongoose = require('mongoose');
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

//import {getSession} from 'next-auth/client'

export default async (req, res) => {
    
        //request id and date are passed as body parameters
        const proceso_id = req.body.proceso_id;
        const date = req.body.selected_date;

        //format date to ISO
        const formatted = new Date(date).toISOString();

        dbConnect();
    
        try {
        // Find the process that needs to be updated
        const proc = await Proceso.findById(proceso_id);
        proc.fecha_agendada = formatted;
        // Save the changes
        await proc.save();

        res.status(200).json({ status: 'Date of ' + proceso_id + ' updated to ' + date});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };