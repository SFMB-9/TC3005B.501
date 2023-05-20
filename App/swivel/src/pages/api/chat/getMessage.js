
import { Messages } from "../../../models/message";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
    
    if (req.method === 'GET') {
        dbConnect();

        const { channel } = req.body;
        const messages = await Messages.find({channel: channel}).sort({ timestamp: 1 });

        res.status(200).json(messages);
        return;
    }
}