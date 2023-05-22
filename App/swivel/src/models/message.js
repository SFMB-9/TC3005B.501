
import mongoose, { model } from "mongoose";

mongoose.connection.setMaxListeners(20); 

const messageSchema = new mongoose.Schema({
  content: String,
  sender: String,
  timestamp: Date,
  channel: String,
},
{collection: "messages"}
);

const Messages = mongoose.models.Messages || mongoose.model("Messages", messageSchema);

export {Messages};
