import {GAEntity} from '../../models/user'
import dbConnect from '@/config/dbConnect'

export async function handler(req, res) {
  if (req.method === 'GET') {
    dbConnect()
    const gaUser = await GAEntity.findOne({email: req.body.email})
    if (!gaUser) return res.status(400).json({message: 'User not found!'})
    return res.status(200).json({message:'Found user!', user: gaUser})
  }
}