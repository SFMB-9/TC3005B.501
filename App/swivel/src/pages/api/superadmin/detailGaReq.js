const mongoose = require("mongoose");
import dbConnect from "../../../config/dbConnect";
import {User} from "../../../models/user";
const Proceso = require("../../../models/procesos");
import { encryptRole } from "../../../utils/crypto";
import { Select, MenuItem, Typography, Button} from "@mui/material";
import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";
 

export default async function handler(req, res){

	const reqId = req.body.id;

	if(req.method == "POST"){

		const client = await connectToDatabase;
    	const db = client.db("test");
    	const processCollection = db.collection('procesos');

		try{


			const reqFound = await processCollection.findOne({_id: new ObjectId(reqId)});
			const groupDetails = reqFound.info_GA
			const groupApproval = reqFound
			const groupDocs = reqFound.documentos


			
			return res.status(200).json({groupApproval, groupDetails, groupDocs, message: "Success" });
			
		} catch (err){
			console.log(err);
		}
 

	
	} else {
		return res.status(400).json({ msg: "Method not permitted" })
	}}

