import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {


	
	if (req.method === 'DELETE') {

		const userId = req.body.id

		const client = await connectToDatabase;
    	const db = client.db("test");
    	const usersCollection = db.collection('usuarios');

    	await usersCollection.deleteOne({_id: new ObjectId(userId) })


		return res.status(200).json({message: 'Successfully deleted user!' })
	}
}
 