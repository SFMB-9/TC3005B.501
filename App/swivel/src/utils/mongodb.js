// MONGODB_URI= "mongodb+srv://sebasgonvi:r1DsubV4F8A1NAZm@clustertest.l66fito.mongodb.net/?retryWrites=true&w=majority"
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://asananez:testPassword@testcluster.9q0xofl.mongodb.net/test";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the MongoDB server");
    const db = client.db("testcluster");
    return { db, client };

    // Continue with your database operations...
  } catch (error) {
    console.error("Error connecting to the MongoDB server:", error);
  }
}

export default connectToDatabase;
