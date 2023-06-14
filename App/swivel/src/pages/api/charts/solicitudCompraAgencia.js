import connectToDatabase from '@/utils/mongodb';

export default async function handler(req, res) {
  const name = req.query.name;
  console.log(name);
  try {
    const client = await connectToDatabase;
    const db = client.db("test");
    const procesos = db.collection("procesos");

    const documents = await procesos.find({"agencia.nombres": name }).toArray();

    // Extract the files or relevant data from the documents
    res.status(200).json({ message: "Datos recuperados", documents });

    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}