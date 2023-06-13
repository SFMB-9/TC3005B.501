const mongoose = require("mongoose");
import dbConnect from "../../../config/dbConnect";
import {User} from "../../../models/user";
const Proceso = require("../../../models/procesos");
import { encryptRole } from "../../../utils/crypto";


export default async function handler(req, res){

	const reqId = req.body.id;

	if(req.method == "POST"){

		const client = await connectToDatabase;
    	const db = client.db("test");
    	const processCollection = db.collection('procesos');
    	const userCollection = db.collection('usuarios');

		try{


			const reqFound = await processCollection.findOne({_id: new ObjectId(reqId)});
			const userId = reqFound.usuario_final_id;

			const managerDetails= await userCollection.findOne({_id: new ObjectId(userId)});

			const agencyDetails = await userCollection.findOne({_id: new ObjectId(reqFound.agencia_id)});

			const repDetails = await userCollection.findOne({_id: new ObjectId(agencyDetails.grupo_automotriz_id)});
			
			
			return res.status(200).json({agencyDetails,managerDetails,reqFound,repDetails, message: "Success" });
			
		} catch (err){
			console.log(err);
		}
 

	
	} else {
		return res.status(400).json({ msg: "Method not permitted" })
	}}

