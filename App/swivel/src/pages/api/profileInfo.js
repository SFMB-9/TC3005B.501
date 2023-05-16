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
            const profiles = await profileCollection.find({}).toArray((err, users) => {
                console.log(profiles)
            })

            return res.status(200).json({
                message: 'Perfiles recuperados exitosamente',
                pruebas: profiles,
            })
        }
        catch (error) {
            console.error(error)
            res.status(500).json({message: 'Algo salio mal.'})
            return res.status(400).json({error})
        }
    }
}