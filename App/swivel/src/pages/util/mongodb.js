// MONGODB_URI= "mongodb+srv://sebasgonvi:r1DsubV4F8A1NAZm@clustertest.l66fito.mongodb.net/?retryWrites=true&w=majority"


import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://sebasgonvi:r1DsubV4F8A1NAZm@clustertest.l66fito.mongodb.net/?retryWrites=true&w=majority"
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let connectToDatabase

if (!uri) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  connectToDatabase = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  connectToDatabase = client.connect()
}

export default connectToDatabase
