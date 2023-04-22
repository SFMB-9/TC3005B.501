/* -------------------------------------------------------------------------- 
[H-68]                                    
Endpoint para obtener las ordenes de compra asignadas a un vendedor
Autor: Alfredo Jeong Hyun Park
 -------------------------------------------------------------------------- */
import mongoose from 'mongoose'

export const getSalesOrder = async (req, res) => {
	if (req.method === 'GET' && req.body !== null) {
		try {
			const sellerSchema = new mongoose.Schema({
				vendedor_id: { type: Number, required: true },
				gerente_id: { type: Number, required: true },
				ventas_en_proceso: { type: Number, required: true },
				ventas_concluidas: { type: Number, required: true },
			})
			const Seller = mongoose.model('Seller', sellerSchema)

			await mongoose.connect(process.env.MONGODB_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})

			const allSalesInProgress = await Seller.find(
				{
					vendedor_id: req.body.vendedor_id,
				},
				'ventas_en_proceso'
			)

			return res.status(200).json({
				message: 'Obtuvo todas las ventas en proceso.',
				ventasTotales: allSalesInProgress,
			})
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Fallo al obtener las ventas en proceso.', error })
		}
	}
}
