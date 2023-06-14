const Proceso = require("../../../models/procesos");
import dbConnect from '../../../config/dbConnect'
import bcrypt from 'bcryptjs'
const { ObjectId } = require('mongodb');


export default async function handler(req, res) {


	
	if (req.method === 'POST') {
		dbConnect()

		const schema = Proceso.schema;

schema.add({ fecha_estatus: { type: Date, default: new Date } });

		const queryID =  req.body.id
		const updateStamp = new Date()
		const reqProcess = await Proceso.findByIdAndUpdate(
  queryID,
  { $set: { estatus_validacion: req.body.status, fecha_estatus: updateStamp} },
  { new: true,strict: false },)

		return res.status(200).json({ message: 'Successfully updated status!' })
	}
}
