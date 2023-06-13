import connectToDatabase from '@/utils/mongodb'
import { ObjectId } from "mongodb";

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
    // console.log("Connecting to DB");
    // dbConnect();
    // console.log("Connected to DB");


    try {
        const client = await connectToDatabase;
        const db = client.db("test");
        const userCollection = db.collection('usuarios');
        
        // Find the process that needs to be updated
        const profile = await userCollection.findOne({_id: new ObjectId(id)});
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

        console.log("ID: ");
        console.log(id);
        console.log("New documents: ");
        console.log(doc);

        await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: { documentos: doc } });

        // profile.documentos = doc;
        // profile.markModified('documentos');
        // //save the changes
        // await profile.save();
        return res.status(200).json({ message: 'Updated file in request: ' + id + ' at document: ' + doc[doc_index].nombre_documento});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    } 
};