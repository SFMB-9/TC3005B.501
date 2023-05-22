import connectToDatabase from '@/utils/mongodb'

export default async function handler(req, res) {
  const client = await connectToDatabase;
  const db = client.db(nextjs-mongodb-demo);

  if (req.method === 'GET' && req.body !== null) {
    try {
      const testsCollection = db.collection('procesos')  
      const tests = await testsCollection.find({"usuario_final_id": ObjectId(req.usuario_final_id), tipo_proceso: 'pruebaManejo'}).toArray()

      return res.status(200).json({
        message:'Pruebas recuperadas exitosamente',
        pruebas: tests
      })
    } catch (error) {
      return res.status(400).json({error}) 
    }
  }
}
