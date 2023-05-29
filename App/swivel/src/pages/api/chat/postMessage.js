import { Messages } from "../../../models/message";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        dbConnect();
        const { content, sender, timestamp, channel } = req.body;
        await Messages.create({content, sender, timestamp, channel});

        res.status(201).json({ message: 'Message saved.' });
        return;
    }
}