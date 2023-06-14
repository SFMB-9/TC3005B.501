const mongoose = require("mongoose");
import dbConnect from "../../../config/dbConnect";
import {User} from "../../../models/user";
const Proceso = require("../../../models/procesos");
import { encryptRole } from "../../../utils/crypto";


export default async function handler(req, res){

	const userId = req.body.id;

	if(req.method == "POST"){

		dbConnect();

		try{
			const groupDetails= await User.find(
			{ 
				_id:userId
				
			})

			const groupAgencies = await User.find({

				grupo_automotriz_id:userId,
				__t: "AgencyEntity"

			})

			const managers = await User.find({
				grupo_automotriz_id:userId,
				__t:"AdminUser"
			})

			let groupApproval; 

			
			for (const manager of managers) {

				groupApproval = await Proceso.find({usuario_ga_id:manager._id,tipo_proceso:"registroGA"})

				if (groupApproval) {break} else {continue}

			}

			console.log(groupApproval)


			
			
			return res.status(200).json({groupDetails: groupDetails[0],groupAgencies, groupApproval: groupApproval[0], message: "Success" });
			
		} catch (err){
			console.log(err);
		}
 

	
	} else {
		return res.status(400).json({ msg: "Method not permitted" })
	}}

