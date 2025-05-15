import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = new express();
// Middleware to parse incoming JSON requests
// Ensures the server can handle JSON data in request bodies
app.use(express.json());

// Middleware to log request method, URL, and status code after the response is sent
// Logs information about each incoming request and its response status
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`Method:${req.method} Url:${req.url} Status:${res.statusCode}`);
  });
  next(); // Proceed to the next middleware or route handler
});

// Start the server on port 5100
// The server listens for incoming connections on port 5100
app.listen(5100, () => {
  console.log("Server is running on port 5100");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("open", () => console.log("Database connection successful"));
db.on("error", () => console.log("Database connection not successful"));
