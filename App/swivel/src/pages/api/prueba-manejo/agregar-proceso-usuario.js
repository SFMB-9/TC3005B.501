/* 
Diego Corrales Pinedo
15/5/23
Endpoint to add a newly-created process ID
to the list of processes of a user.
*/

const mongoose = require('mongoose');
import dbConnect from "../../../config/dbConnect";
const Usuario = require('../../../models/usuario');

//import {getSession} from 'next-auth/client'

export default async (req, res) => {
    
        // Process ID and user ID are passed as body parameters
        const proceso_id = req.body.proceso_id;
        const user_id = req.body.user_id;

        dbConnect();
    
        try {
        // Find the corresponding user
        const user = await Usuario.findById(user_id);
        user.procesos.push(proceso_id);
        // Save the changes
        await user.save();

        res.status(200).json({ message: 'Proceso agregado exitosamente'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
};