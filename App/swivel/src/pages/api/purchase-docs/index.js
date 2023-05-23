/*

Sebastián González Villacorta	

22-05-2023

Description: Endpoint para obtener el proceso de compra de un auto con su id

*/
import mongoose from "mongoose";
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        res.status(400).json({ message: 'Method not allowed' });
    }

    let process_id = req.query.process_id;

    await dbConnect();

    try {
        const process = await Proceso.findById(process_id);

        if (!process) {
            return res.status(404).json({ message: 'Proceso de compra no encontrado' });
        }

        return res.status(200).json({ message: 'Proceso de compra encontrado', result: process });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error al obtener proceso de compra", error: err });
    } finally {
        mongoose.disconnect();
        console.log("Desconectado de MongoDB");
    }
}