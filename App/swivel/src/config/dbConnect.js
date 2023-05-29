import mongoose from "mongoose";

const dbConnect = () => {
  const { MONGODB_URI } = process.env;

  return new Promise((resolve, reject) => {
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", (error) => {
      console.error(error);
      reject(error);
    });
    
    db.once("open", () => {
      console.log("Connected to MongoDB");
      resolve();
    });
  });
};

export default dbConnect;