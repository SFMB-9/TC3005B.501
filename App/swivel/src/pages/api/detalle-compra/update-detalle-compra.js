/*
[H_70]

Endpoint para la modificación de la etapa de compra dentro de los detalles de compra como usuario vendedor

Autor: Alfredo Jeong Hyun Park
*/

import connectToDatabase from '../../util/mongodb'

const client = await connectToDatabase
const db = client.db('nextjs-mongodb-demo')

export const updateCarCollection = async (req, res) => {
	const client = await connectToDatabase
	const db = client.db('nextjs-mongodb-demo')

	if (req.method === 'PATCH' && req.body !== null) {
		try {
			// Get sale process
			const saleProcessCollection = db.collection('proceso_venta')
			const saleProcess = saleProcessCollection.findOne({
				_id: ObjectId(req.body.proceso_id),
			})

			const carCollection = db.collection('automovil')
			await carCollection.updateOne(
				{
					_id: ObjectId(saleProcess['auto_id']),
				},
				{ $set: { ...req.body } }
			)
			return res.status(201).json({
				message: 'Coleccion de automoviles actualizado correctamente.',
				result: saleProcess,
			})
		} catch (error) {
			return res.status(500).json({
				message: 'Fallo al actualizar coleccion de automoviles',
				error,
			})
		}
	}
}

export const updateAgencyCollection = async (req, res) => {
	const client = await connectToDatabase
	const db = client.db('nextjs-mongodb-demo')

	if (req.method === 'PATCH' && req.body !== null) {
		try {
			// Get sale process
			const saleProcessCollection = db.collection('proceso_venta')
			const saleProcess = saleProcessCollection.findOne({
				_id: ObjectId(req.body.proceso_id),
			})

			// Get carData in order to update the car's agency
			const carCollection = db.collection('automovil')
			const carData = await carCollection.findOne({
				_id: ObjectId(saleProcess['auto_id']),
			})

			const agencyCollection = db.collection('agencia')

			await agencyCollection.updateOne(
				{
					_id: ObjectId(carData['agencia_id']),
				},
				{ $set: { ...req.body } }
			)

			return res.status(201).json({
				message: 'Coleccion de agencias actualizado correctamente.',
				result: saleProcess,
			})
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Fallo al actualizar coleccion de agencias.', error })
		}
	}
}

export const updateDirectionData = async (req, res) => {
	try {
		// Get sale process
		const saleProcessCollection = db.collection('proceso_venta')
		const saleProcess = saleProcessCollection.findOne({
			_id: ObjectId(req.body.proceso_id),
		})

		// Get agency data to update direction
		const agencyCollection = db.collection('agencia')
		const agencyData = await agencyCollection.findOne({
			_id: ObjectId(carData['agencia_id']),
		})

		const directionCollection = db.collection('direccion')
		await directionCollection.updateOne(
			{
				_id: ObjectId(agencyData['direccion_id']),
			},
			{ $set: { ...req.body } }
		)

		return res.status(201).json({
			message: 'Proceso de venta actualizado correctamente.',
			result: saleProcess,
		})
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Fallo al actualizar el proceso de venta', error })
	}
}

export const updateAutoGroupCollection = async (req, res) => {
	try {
		// Get sale process
		const saleProcessCollection = db.collection('proceso_venta')
		const saleProcess = saleProcessCollection.findOne({
			_id: ObjectId(req.body.proceso_id),
		})

		// Get car data in order to get car's agency data
		const carCollection = db.collection('automovil')
		const carData = await carCollection.findOne({
			_id: ObjectId(saleProcess['auto_id']),
		})

		// Get agency data to update auto group data
		const agencyCollection = db.collection('agencia')
		const agencyData = await agencyCollection.findOne({
			_id: ObjectId(carData['agencia_id']),
		})

		const autoGroupCollection = db.collection('grupo_automotriz')
		await autoGroupCollection.updateOne(
			{
				_id: ObjectId(agencyData['grupo_automotriz']),
			},
			{ $set: { ...req.body } }
		)

		return res.status(201).json({
			message: 'Grupo automotriz actualizado correctamente.',
			result: saleProcess,
		})
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Fallo al actualizar grupo automotriz.', error })
	}
}

export const updateDocumentCollection = async (req, res) => {
	try {
		// Get sale process
		const saleProcessCollection = db.collection('proceso_venta')
		const saleProcess = saleProcessCollection.findOne({
			_id: ObjectId(req.body.proceso_id),
		})

		const documentCollection = db.collection('documentos')
		await documentCollection.updateOne(
			{
				usuario_propietario_id: ObjectId(saleProcess['usuario_final_id']),
			},
			{ $set: { ...req.body } }
		)

		return res
			.status(201)
			.json({ message: 'Documento actualizado correctamente.' })
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Fallo al actualizar documentos.', error })
	}
}