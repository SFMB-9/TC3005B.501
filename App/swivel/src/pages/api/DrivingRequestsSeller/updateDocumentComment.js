const mongoose = require('mongoose');
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

//import {getSession} from 'next-auth/client'

export default async (req, res) => {
        
        //request id, document id and status are passed as body parameters
        const request_id = req.body._id;
        const comment = req.body.comment;
        const doc_id = req.body.doc_id;
      
        await dbConnect();
    
        try {
        // Find the process that needs to be updated
        const proc = await Proceso.findById(request_id);
        //get the documents of the process
        const doc = proc.documentos;
        //update comment
        doc[doc_id].comentarios = comment;
        proc.documentos = doc;
        proc.markModified('documentos');
        //save the changes
        await proc.save();

        res.status(200).json({ status: 'added comment: ' + comment + ' in request: ' + request_id + ' at document: ' + doc[doc_id].nombre});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };
 