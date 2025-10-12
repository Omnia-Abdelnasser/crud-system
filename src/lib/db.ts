import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI as string);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDatabase;
