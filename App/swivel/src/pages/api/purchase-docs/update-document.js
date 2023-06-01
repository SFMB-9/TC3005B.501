import mongoose from "mongoose";
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

export default async function handler(req, res) {

    console.log(req.query);
    const process_id = req.query.process_id;
    const doc_index = req.query.doc_index;
    const file_url = req.query.file_url;
    const encodedURL = file_url.replace("/resumen-compra/", "/resumen-compra%2F");
    const update_date = req.query.update_date;

    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Metodo no permitido' })
    }

    await dbConnect();

    try {
        // Find the process that needs to be updated
        const proc = await Proceso.findById(process_id);
        if (!proc) {
            return res.status(404).json({ message: 'No se encontro el proceso' });
        }
        if (!proc.documentos[doc_index]) {
            return res.status(404).json({ message: 'No se encontro el documento' });
        }
        //get the documents of the process
        const doc = proc.documentos;
        //update file url and update date
        doc[doc_index].url = encodedURL;
        doc[doc_index].fecha_modificacion = update_date;

        console.log()

        // Update status of the document using validation API only if it is an INE
        if (doc[doc_index].nombre_documento === "INE" && doc[doc_index].estatus === "Pendiente") {
            console.log("Validating INE" + `${encodedURL}`);
            let url = new URL('/api/validate-document', `http://${req.headers.host}`);
            url.searchParams.append('idURL', encodedURL);
            
            const response = await fetch(url.toString(), {
                method: "PUT",
                body: JSON.stringify({
                    idURL: encodedURL,
                })
            });
            const data = await response.json();
            //const data = JSON.parse(dataJSON);
            console.log(data);

            if (data.validated) {
                doc[doc_index].estatus = "Verificado por INE API";
            } else {
                if (data.msg === "Su identificación no es valida; revise con su agente.") {
                    doc[doc_index].comentarios = "Identificación no válida, consulte con su agente ";
                } else if (data.msg === "No hemos podido validar tu identificación, intenta de nuevo.") {
                    doc[doc_index].comentarios = "Ha ocurrido un error en la validación, intente de nuevo más tarde";
                } else if (data.msg == "La foto no es visible, intente de nuevo.") {
                    doc[doc_index].comentarios = "La foto no es visible, intente de nuevo.";
                }
            }
        }

        proc.documentos = doc;
        proc.markModified('documentos');
        //save the changes
        await proc.save();
        return res.status(200).json({ message: 'Updated file in request: ' + process_id + ' at document: ' + doc[doc_index].nombre });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    } finally {
        mongoose.disconnect();
        console.log("Desconectado de MongoDB");
    }
};