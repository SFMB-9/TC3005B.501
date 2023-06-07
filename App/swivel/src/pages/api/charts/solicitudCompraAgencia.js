


import { connectToDatabase } from '@/utils/mongodb';

export default async function handler(req, res) {

    const name = req.query.name;


    const client = await connectToDatabase;
    const db = client.db("test");
    const procesos = db.collection("procesos");


    try {
        const result = await procesos.aggregate([
            {
              $match: {
                "agencia.nombres": name,
              }
            },
            {
              $group: {
                _id: "$auto.modelo",
                count: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                modelo: "$_id",
                count: 1
              }
            }
          ]);  
        console.log(result);
        res.status(200).json({ message: "Datos recuperados", result: result });
    }
    catch (error) {
        res.status(500).json({ message: "Error" });
    }

}

