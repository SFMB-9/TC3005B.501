import mongoose from "mongoose";
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

import Stripe from "stripe";
import { SellerUser } from "@/models/user";
import connectToDatabase from "@/utils/mongodb";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

    console.log(req.query);
    const process_id = req.query.process_id;
    const session_id = req.query.session_id;

    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Metodo no permitido' })
    }

    try {
      // Retrieve the Checkout Session from Stripe
      const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  
      // Check the payment status
      const paymentStatus = checkoutSession.payment_status;

      const check_id = checkoutSession.metadata.process_id;
  
      // Do something based on the payment status
      if (paymentStatus === "paid" && check_id === process_id) {
  
        try {

          await dbConnect();

          const client = await connectToDatabase;
          const db = client.db("test");
          const procesos = db.collection('procesos');

          const proc = await procesos.findOneAndUpdate({_id : new ObjectId(process_id)}, {$set: {estatus: "pagado"}});

          // Find the process that needs to be updated
          // const proc = await Proceso.findById(process_id);
          // if (!proc) {
          //   return res.status(404).json({ message: "No se encontro el proceso" });
          // }
          //get the documents of the process
  
          // proc.estatus = "pagado";
          // proc.markModified("pagado");
          // //save the changes
          // await proc.save();

          const vendedor = await SellerUser.findById(proc.value.vendedor._id);
          vendedor.contar_ventas_en_proceso -=1;
          console.log("Ventas en proceso:" + vendedor.contar_ventas_en_proceso);
          vendedor.markModified("contar_ventas_en_proceso");
          await vendedor.save();

          return res
            .status(200)
            .json({ message: "Updated process status: " + process_id });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: error.message });
        } finally {
          mongoose.disconnect();
          console.log("Desconectado de MongoDB");
        }
      }
    } catch (error) {
      console.error("Error retrieving payment information:", error);
      res.status(500).json({ error: "Failed to retrieve payment information" });
    }
};