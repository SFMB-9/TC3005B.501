import twilio from 'twilio';

export default async function handler(req, res) {
    if(req.method !== 'POST'){
        return res.status(405).json({ message: 'Wrong request method' });
    }

    const { to, message } = req.body;

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    try {
        const result = await client.messages.create({
            body: message,
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
            to: `whatsapp:${to}`,
        });

        console.log(result);

        res.status(200).json({ message: 'Message sent' });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send WhatsApp message.' });
    }
}
