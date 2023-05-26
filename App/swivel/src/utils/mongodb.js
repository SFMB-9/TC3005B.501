// MONGODB_URI= "mongodb+srv://sebasgonvi:r1DsubV4F8A1NAZm@clustertest.l66fito.mongodb.net/?retryWrites=true&w=majority"
import { MongoClient } from "mongodb";

const { MONGODB_URI } = process.env;
// const uri =
//   "mongodb+srv://sebasgonvi:r1DsubV4F8A1NAZm@clustertest.l66fito.mongodb.net/?retryWrites=true&w=majority";
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let connectToDatabase;

if (!MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect();
  }
  connectToDatabase = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI, options);
  connectToDatabase = client.connect();
}

export default connectToDatabase;
