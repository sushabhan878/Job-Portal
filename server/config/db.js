import mongoose from "mongoose";

// Function to connect to the mongodb database

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
  await mongoose.connect(process.env.MONGO_URI);
};

export default connectDB;
