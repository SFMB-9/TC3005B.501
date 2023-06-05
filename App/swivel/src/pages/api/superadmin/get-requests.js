import { SaEntity } from '../../models/user'
import dbConnect from '../../config/dbConnect'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		dbConnect()

		const saUser = await SaEntity.findOne({ email: req.body.email })
    if (!saUser)
      return res.status(400).json({ message: 'Could not find user!' })

    const procesos = saUser.procesos

    const requests = []
    
    const testsCollection = db.collection('procesos')  
    procesos.forEach(id => {
      testsCollection.findOne({"usuario_final_id": ObjectId(id)}).then((request) => {
        requests.push(request)
      }).catch((err) => {
        return res.status(400).json({message: 'Could not find requests!'})  
      })
    })

		return res.status(200).json({ message: 'Successfully got all requests!', procesos: requests})
	}
}
