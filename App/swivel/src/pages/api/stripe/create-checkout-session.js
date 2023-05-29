// pages/api/create-checkout-session.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log(JSON.parse(req.body.items))
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: JSON.parse(req.body.items),
        mode: 'payment',
        metadata: {a: 'aaa', b: 'bbb'},
        success_url: `${req.headers.origin}/success/${req.body.id}/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/purchase/${req.body.id}`,
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

