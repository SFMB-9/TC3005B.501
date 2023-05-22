import connectToDatabase from '@/utils/mongodb'

export default async function handler(req, res) {
	const client = await connectToDatabase
	const db = client.db('nextjs-mongodb-demo')

	if (req.method === 'GET' && req.body !== null) {
		try {
			const saleProcessCollection = db.collection('procesos')
			const result = await saleProcessCollection.find({"usuario_final_id": ObjectId(req.usuario_final_id), "tipo_proceso": "solicitudCompra"}).toArray()

			return res.status(200).json({
				message: 'Detalle de compra recuperado exitosamente',
				result: result,
			})
		} catch (err) {
			return res
				.status(400)
				.json({ message: 'Error al recuperar detalle de compra', error: err })
		}
	}
}
