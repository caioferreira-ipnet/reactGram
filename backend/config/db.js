const mongoose = require("mongoose");

const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DATABASE;
const dbURI = process.env.MONGODB_URI;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(dbURI, {
      user: dbUser,
      pass: dbPassword,
      dbName: dbName,
    });

    console.log("Connected to MongoDB");
    return dbConn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};
void conn();
module.exports = conn;
