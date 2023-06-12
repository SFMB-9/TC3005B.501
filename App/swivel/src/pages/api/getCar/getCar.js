import mongoose from 'mongoose';
const Usuario = require('../../../models/user');
import dbConnect from "../../../config/dbConnect";


export default async (req, res) => {

    const {id} = req.query;

    dbConnect();
    try{
        const userData = await Usuario.findById(id);
        res.status(200).json({userData})
        
    } catch (error) {
        res.status(500).json({message: error.message})

    }
    }