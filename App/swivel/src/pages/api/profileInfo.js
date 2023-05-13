import User from "../../models/user";
import connectToDatabase from "@/utils/mongodb";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res)
{
    const client = await connectToDatabase
    const db = client.db('nextjs-mongodb-demo')
    if (req.method == "GET")
    {
        try {
            const profileCollection = db.collection('users')
            const profiles = await profileCollection.find({}).toArray((err, users) => {
                console.log(profiles)
            })

            return res.status(200).json({
                message: 'Perfiles recuperados exitosamente',
                pruebas: profiles,
            })
        }
        catch (error) {
            return res.status(400).json({error})
        }
    }
}