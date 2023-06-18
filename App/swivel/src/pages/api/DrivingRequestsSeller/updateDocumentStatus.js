const mongoose = require('mongoose');
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

//import {getSession} from 'next-auth/client'

export default async (req, res) => {
        
        //request id, document id and status are passed as body parameters
        const request_id = req.body._id;
        const doc_id = req.body.doc_id;
        const new_status = req.body.status
      

        if(req.method !== 'PUT'){
            return res.status(405).json({message: 'Metodo no permitido'})
        }

        dbConnect();
    
        try {
        // Find the process that needs to be updated
        const proc = await Proceso.findById(request_id);
        if (!proc) {
          return res.status(404).json({ message: 'No se encontro el proceso' });
        }
        if (!proc.documentos[doc_id]) {
          return res.status(404).json({ message: 'No se encontro el documento' });
        }

        //get the documents of the process
        const doc = proc.documentos;
        //change the status of the document
        doc[doc_id].estatus = new_status;
        proc.documentos = doc;
        console.log(proc);
        proc.markModified(`documentos.${doc_id}.estatus`); 
        //save the changes
        await proc.save();
        res.status(200).json({ message: 'status of document: ' + doc[doc_id].nombre_documento + ' in request: ' + request_id + ' to ' + new_status});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };
 