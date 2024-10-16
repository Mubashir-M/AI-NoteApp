const mongoose = require("mongoose");

const connectDB = async (mongoDb_Uri) => {
  try {
    await mongoose.connect(mongoDb_Uri);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
