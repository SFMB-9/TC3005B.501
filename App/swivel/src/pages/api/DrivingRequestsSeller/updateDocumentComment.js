const mongoose = require('mongoose');
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

//import {getSession} from 'next-auth/client'

export default async (req, res) => {
        
        //request id, document id and status are passed as body parameters
        const request_id = req.body._id;
        const comment = req.body.comment;
        const doc_id = req.body.doc_id;

        if(req.method !== 'PUT'){
            return res.status(405).json({message: 'Metodo no permitido'})
        }

      
        await dbConnect();
    
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
        //update comment
        doc[doc_id].comentarios = comment;
        proc.documentos = doc;
        proc.markModified('documentos');
        //save the changes
        await proc.save();

        res.status(200).json({ message: 'added comment: ' + comment + ' in request: ' + request_id + ' at document: ' + doc[doc_id].nombre});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };
 