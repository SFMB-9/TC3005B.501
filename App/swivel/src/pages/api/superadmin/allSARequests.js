const mongoose = require("mongoose");
import dbConnect from "../../../config/dbConnect";
const Proceso = require("../../../models/procesos");


export default async function handler(req, res){

	if(req.method == "GET"){

		const allRequests;

		await dbConnect();

		try{
			allRequests = await Proceso.find(
			{
				$or:[{tipo_proceso: "solicitud_agencia"}, {tipo_proceso:"solicitud_grupo_automotriz"}]
			}
			)
		

		} catch (err){
			console.log(err);
		}
 

	res.status(200).json({ allRequests, message: "Success" });
	} else {
		return res.status(400).json({ msg: "Method not permitted" })
	}}