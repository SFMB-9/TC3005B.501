/* 
Author: Diego Corrales
Date: 7/5/23
Endpoint to add the given seller to the
given process and vice-versa
*/

const mongoose = require('mongoose');
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');
const Usuario = require('../../../models/usuario');

//import {getSession} from 'next-auth/client'

export default async (req, res) => {
    
        // Process ID and user ID are passed as body parameters
        const process_id = req.body.proceso_id;
        const seller_id = req.body.seller_id;

        console.log("Seller ID: " + req.body.seller_id);

        dbConnect();
    
        try {
        // Find the corresponding user
        const process = await Proceso.findById(process_id);
        process.vendedor_id = seller_id;
        // Save the changes
        await process.save();

        const seller = await Usuario.findById(seller_id);
        // Increment amount of in-process processes for seller
        seller.contar_ventas_en_proceso += 1;
        // Add process to list of assigned processes
        seller.procesos.push(process_id);
        // Save the changes
        await seller.save();

        res.status(200).json({ message: 'Vendedor agregado exitosamente'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
};