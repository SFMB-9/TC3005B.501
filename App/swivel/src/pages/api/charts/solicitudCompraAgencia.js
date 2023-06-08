import connectToDatabase from '@/utils/mongodb_function';

export default async function handler(req, res) {
  const id = req.query.id;
  console.log(id);
  try {
    const client = await connectToDatabase();
    const db = client.db("test");
    const procesos = db.collection("procesos");

    const documents = await procesos.find({ 'agencia._id': id }).toArray();

    // Extract the files or relevant data from the documents
    const files = documents.map((document) => document.documentos);

    res.status(200).json({ message: "Datos recuperados", files });

    client.close(); // Close the MongoDB connection
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
