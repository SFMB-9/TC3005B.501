import { SaEntity } from '../../../models/user'
import dbConnect from '../../../config/dbConnect'

import { encryptRole } from '../../../utils/crypto'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		dbConnect()

		const agency = req.body.nombre_agencia
		const name = req.body.nombres
		const surname = req.body.last_name
		const email = req.body.email
		const password = req.body.password
		const phone = req.body.numero_telefonico
		const roleAdmin = req.body.tipo_usuario
		const roleSA = req.body.tipo_usuario

		const encrypted_SA = encryptRole(roleSA)
		const encrypted_admin = encryptRole(roleAdmin)

		if (!/[\w\.-]+@([\w-]+\.)+[\w-]{2,4}/.test(email)) {
			// regex to check email format validity, returns if non-compliant
			return res.status(400).json({ message: 'wrong email format' })
		}

		let ping = require('ping')

		ping.sys.probe(email, function (isAlive) {
			// email existence validation, pings the email and returns if non-existent
			isAlive
				? function () {
						// continue
				  }
				: function () {
						return res.status(400).json({ message: 'Email is invalid' })
				  }
		})

		let usedEmail = await SaEntity.findOne({ email: email })
		// email existence check within the db, returns if there is already an account with the email
		if (!usedEmail) {
			const SA = await SaEntity.create({
				tipo_usuario: encrypted_SA,
			})

			const SAdmin = await SaEntity.create({
				tipo_usuario: encrypted_admin,
				nombres: name,
				apellido: surname,
				email: email,
				password: password,
				numero_telefonico: phone,
			})

			res.status(200).json({
				message: 'Super admin registered successfully',
				superAdmin: SAdmin,
			})
		} else {
			res.status(400).json({ message: 'Account already exists' })
		}
	} else {
		res.status(405).json({ message: 'Incorrect request method' })
	}
}
