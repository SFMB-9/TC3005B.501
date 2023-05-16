import User from "../../models/user";
import connectToDatabase from "@/utils/mongodb";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res)
{
    const { usuario_id } = req.query
    const client = await connectToDatabase
    const db = client.db('nextjs-mongodb-demo')
    if (req.method == "GET")
    {
        try {
            const profileCollection = db.collection('usuario')
            const info = await profileCollection.findOne({_usuario_id: usuario_id})
            return info
        }
        catch (error) {
            console.error(error)
            res.status(500).json({message: 'Algo salio mal.'})
            return res.status(400).json({error})
        }
    }
}