// pages/api/get-payment-info.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { session_id } = req.query;

  try {
    // Retrieve the Checkout Session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Retrieve the Payment Intent associated with the Checkout Session
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

    // Extract the relevant payment information
    const paymentInfo = {
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      payment_id: paymentIntent.id,
      date: new Date(paymentIntent.created * 1000),
      pi: paymentIntent // Convert UNIX timestamp to JavaScript Date object
    };

    res.status(200).json(paymentInfo);
  } catch (error) {
    console.error('Error retrieving payment information:', error);
    res.status(500).json({ error: 'Failed to retrieve payment information' });
  }
};
