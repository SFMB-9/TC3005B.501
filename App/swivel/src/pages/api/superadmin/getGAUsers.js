const mongoose = require("mongoose");
import dbConnect from "../../../config/dbConnect";
import {User} from "../../../models/user";
import { encryptRole } from "../../../utils/crypto";


export default async function handler(req, res){

	if(req.method == "GET"){

		dbConnect();

		try{
			const allUsers= await User.find(
			{ tipo_usuario: encryptRole("ga")}
			)
			
			return res.status(200).json({allUsers, message: "Success" });
			
		} catch (err){
			console.log(err);
		}
 

	
	} else {
		return res.status(400).json({ msg: "Method not permitted" })
	}}

