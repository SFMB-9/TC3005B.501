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

			const groupApproval = await Proceso.find({
				grupo_automotriz_id:userId,
			tipo_proceso:"peticionGA"
			})
			
			
			return res.status(200).json({groupDetails,groupAgencies,groupApproval, message: "Success" });
			
		} catch (err){
			console.log(err);
		}
 

	
	} else {
		return res.status(400).json({ msg: "Method not permitted" })
	}}

