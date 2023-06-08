const mongoose = require("mongoose");
import dbConnect from "../../../config/dbConnect";
const Proceso = require("../../../models/procesos");


export default async function handler(req, res){

	if(req.method == "GET"){

		dbConnect();

		try{
			const allRequests = await Proceso.find(
			{
				$or:[{tipo_proceso: "peticionA"}, {tipo_proceso:"peticionGA"}]
			}
			)
			
			return res.status(200).json({allRequests, message: "Success" });
			
		} catch (err){
			console.log(err);
		}
 

	
	} else {
		return res.status(400).json({ msg: "Method not permitted" })
	}

}

