import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {


	
	if (req.method === 'POST') {

		const reqId = req.body.id
		const status = req.body.status
		const index = req.body.index

		const client = await connectToDatabase;
    	const db = client.db("test");
    	const processCollection = db.collection('procesos');

    	const proc = await processCollection.findOne({_id:new ObjectId(reqId)})
		const updateStamp = new Date()


		const docs = proc.documentos

		docs[index].estatus = status

		await processCollection.updateOne({_id:new ObjectId(reqId)},{$set: {documentos:docs}})


		return res.status(200).json({message: 'Successfully updated status!' })
	}
}
 