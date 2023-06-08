import { MongoClient } from "mongodb";

const { MONGODB_URI } = process.env;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

if (!MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

let client;

export default async function connectToDatabase() {
  if (!client || !client.isConnected()) {
    client = new MongoClient(MONGODB_URI, options);
    await client.connect();
  }

  return client;
}