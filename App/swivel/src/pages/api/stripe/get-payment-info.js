// pages/api/get-payment-info.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { session_id } = req.query;

  try {
    // Retrieve the Checkout Session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    // Check the payment status
    const paymentStatus = checkoutSession.payment_status;

    // Do something based on the payment status
    if (paymentStatus === "paid") {
      const process_id = id;

      await dbConnect();

      try {
        // Find the process that needs to be updated
        const proc = await Proceso.findById(process_id);
        if (!proc) {
          return res.status(404).json({ message: "No se encontro el proceso" });
        }
        //get the documents of the process

        proc.estatus = "Pagao";
        proc.markModified("pagado");
        //save the changes
        await proc.save();
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
