/*
Diego Corrales Pinedo
15/5/2023

Endpoint to change the chosen date and 
time for an appointment of a driving test.
*/

const mongoose = require('mongoose');
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

//import {getSession} from 'next-auth/client'

export default async (req, res) => {
    
        //request id and date are passed as body parameters
        const proceso_id = req.body.proceso_id;
        const date = req.body.selected_date;
        const time = req.body.selected_time;

        //format date to ISO
        const formattedDate = new Date(date).toISOString();
        const formattedTime = new Date(time).toISOString();

        dbConnect();
    
        try {
        // Find the process that needs to be updated
        const proc = await Proceso.findById(proceso_id);
        proc.fecha_agendada = formattedDate;
        proc.hora_agendada = formattedTime;
        // Save the changes
        await proc.save();

        res.status(200).json({ status: 'Hora y fecha de ' + proceso_id + ' actualizada a ' + formattedDate + formattedTime});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };