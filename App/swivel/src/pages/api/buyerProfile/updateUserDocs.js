import mongoose from "mongoose";
import dbConnect from "../../../config/dbConnect";
const { User } = require("../../../models/user");

export default async function handler(req, res) {
    const id = req.query.id;
    const doc_index = req.query.doc_index;
    const file_url = req.query.file_url;
    const encodedURL = file_url.replace("/resumen-compra/", "/resumen-compra%2F");
    const update_date = req.query.update_date;
    const update_status = req.query.update_status;

    console.log("Received Query: "+ req.query);
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Metodo no permitido' })
    }
    console.log("Connecting to DB");
    dbConnect();
    console.log("Connected to DB");


    try {
        // Find the process that needs to be updated
        const profile = await User.findById(id);
        if (!profile) {
            return res.status(404).json({ message: 'No se encontro el usuario' });
        }
        if (!profile.documentos[doc_index]) {
            return res.status(404).json({ message: 'No se encontro el documento' });
        }
        //get the user's documents 
        const doc = profile.documentos;
        //update file url and update date
        doc[doc_index].url = encodedURL;
        doc[doc_index].fecha_modificacion = update_date;
        doc[doc_index].estatus = update_status;

        // // Update status of the document using validation API only if it is an INE
        // if (doc[doc_index].nombre_documento === "INE" && doc[doc_index].estatus === "Pendiente") {
        //     console.log("Validating INE" + `${encodedURL}`);
        //     const response = await fetch(`http://localhost:3000/api/validate-document?idURL=${encodedURL}`, {
        //         method: "PUT",
        //         body: JSON.stringify({
        //             idURL: encodedURL,
        //         })
        //     });
        //     const data = await response.json();
        //     //const data = JSON.parse(dataJSON);
        //     console.log(data);

        //     if (data.validated) {
        //         doc[doc_index].estatus = "Verificado por INE API";
        //     } else {
        //         if (data.msg === "Su identificación no es valida; revise con su agente.") {
        //             doc[doc_index].comentarios = "Identificación no válida, consulte con su agente ";
        //         } else if (data.msg === "No hemos podido validar tu identificación, intenta de nuevo.") {
        //             doc[doc_index].comentarios = "Ha ocurrido un error en la validación, intente de nuevo más tarde";
        //         } else if (data.msg == "La foto no es visible, intente de nuevo.") {
        //             doc[doc_index].comentarios = "La foto no es visible, intente de nuevo.";
        //         }
        //     }
        // }

        profile.documentos = doc;
        profile.markModified('documentos');
        //save the changes
        await profile.save();
        return res.status(200).json({ message: 'Updated file in request: ' + id + ' at document: ' + doc[doc_index].nombre_documento});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    } 
    // finally {
    //     mongoose.disconnect();
    //     console.log("Desconectado de MongoDB");
    // }
};