const mongoose = require("mongoose");
import dbConnect from "../../../config/dbConnect";
import {User} from "../../../models/user";
const Proceso = require("../../../models/procesos");
import { encryptRole } from "../../../utils/crypto";


export default async function handler(req, res){

	const reqId = req.body.id;

	if(req.method == "POST"){

		dbConnect();

		try{


			const reqFound = await Proceso.findById(reqId);
			const userId = reqFound.usuario_final_id;





			const managerDetails= await User.findById(
				userId
				
			)

			const agencyDetails = await User.findById(
				reqFound.agencia_id
				)

			const repDetails = await User.findById(agencyDetails.grupo_automotriz_id)
			
			
			return res.status(200).json({agencyDetails,managerDetails,reqFound,repDetails, message: "Success" });
			
		} catch (err){
			console.log(err);
		}
 

	
	} else {
		return res.status(400).json({ msg: "Method not permitted" })
	}}

