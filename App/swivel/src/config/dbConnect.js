import mongoose, { mongo } from "mongoose";

const dbConnect = () => {
  const { MONGODB_URI } = process.env;

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Connected to Database'));
};

export default dbConnect;
