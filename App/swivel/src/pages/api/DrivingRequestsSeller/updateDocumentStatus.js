const mongoose = require('mongoose');
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

//import {getSession} from 'next-auth/client'

export default async (req, res) => {
        
        //request id, document id and status are passed as body parameters
        const request_id = req.body._id;
        const doc_id = req.body.doc_id;
        const new_status = req.body.status
        
      
        await dbConnect();
    
        try {
        // Find the process that needs to be updated
        const proc = await Proceso.findById(request_id);
        //get the documents of the process
        const doc = proc.documentos;
        //change the status of the document
        doc[doc_id].status = new_status;
        proc.documentos = doc;
        proc.markModified('documentos');
        //save the changes
        await proc.save();
        res.status(200).json({ status: 'status of document: ' + doc[doc_id].nombre + ' in request: ' + request_id + '  to ' + new_status});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };
