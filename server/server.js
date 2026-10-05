import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = 5000;

app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully! 🍃");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

// Test route
app.get("/", (req, res) => {
    res.send("SmartGuardian Backend is running! 🚀");
});

app.listen(PORT, () => {
    console.log(`SmartGuardian server running on http://localhost:${PORT}`);
});