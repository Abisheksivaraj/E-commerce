const mongoose = require("mongoose");
require("dotenv").config();

// Use environment variable for security
// Make sure your .env file contains the connection string WITHOUT the tlsVersion parameter
const URI = process.env.MONGO_URI;


const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove the tls and tlsVersion options from here
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDb;
