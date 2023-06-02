import { SaEntity } from '../../../models/user'
import dbConnect from '../../../config/dbConnect'

export default async function handler(req, res) {
	if (req.method === 'PUT') {
		dbConnect()

		const saUser = await SaEntity.findOne({ email: req.body.email })

		if (!saUser)
			return res.status(400).json({ message: 'Could not find user!' })

		const currentName = saUser.nombres
    const currentSurname = saUser.apellidos
    const currentEmail = saUser.email
    const currentPhone = saUser.numero_telefonico

    const updatedFields = {}

    // Check for new current values
    if (req.body.name === '' || req.body.name === undefined) {
      updatedFields['nombres'] = currentName
    } else {
      updatedFields['nombres'] = req.body.name
    }
    if (req.body.surname === '' || req.body.surname === undefined){
      updatedFields['apellidos'] = currentSurname
    } else {
      updatedFields['apellidos'] = req.body.surname
    }
    if (req.body.email === '' || req.body.surname === undefined){
      updatedFields['email'] = currentEmail
    } else {
      updatedFields['email'] = req.body.email
    }
    if (req.body.currentPhone === '' || req.body.currentPhone === undefined){
      updatedFields['numero_telefonico'] = currentPhone
    } else {
      updatedFields['numero_telefonico'] = req.body.currentPhone
    }

    try {
      await saUser.updateOne(
        { email: email },
        { $set: { ...updatedFields } }
      )
      return res.status(200).json({ message: 'Successfully updated user!' })
    } catch (error) {
      return res.status(400).json({error: 'Failed to update user!'})
    }
	}
}
