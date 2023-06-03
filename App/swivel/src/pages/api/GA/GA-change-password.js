import { GaEntity } from '../../../models/user'
import dbConnect from '../../../config/dbConnect'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
	if (req.method === 'PUT') {
		dbConnect()

		const gaUser = await GaEntity.findOne({ email: req.body.email })

		if (!gaUser)
			return res.status(400).json({ message: 'Could not find user!' })

		const currentPassword = gaUser.password
		const isOldPassword = await bcrypt.compare(
			req.body.oldPassword,
			currentPassword
		)
		const oldNewPasswordMatch = await bcrypt.compare(
			req.body.password,
			currentPassword
		)

		if (!isOldPassword)
			return res.status(400).json({ message: 'Wrong password' })
		if (oldNewPasswordMatch)
			return res.status(400).json({ message: 'Current password cannot match!' })

		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		await gaUser.updateOne(
			{ email: email },
			{ $set: { password: hashedPassword } }
		)
		return res.status(200).json({ message: 'Successfully updated password!' })
	}
}
