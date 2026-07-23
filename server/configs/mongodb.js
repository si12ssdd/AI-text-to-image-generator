// ─────────────────────────────────────────────────────────────────────────────
// mongodb.js
// MongoDB connection configuration using the Mongoose ODM library.
// Sets up database event listeners and connects via the environment URI.
// ─────────────────────────────────────────────────────────────────────────────

import mongoose from "mongoose";

const connectDB = async () => {

    // Register listener event that fires when connection succeeds
    mongoose.connection.on('connected', () => {
        console.log("Database Connected Successfully");
    })

    try {
        // Connect to MongoDB using URI from environment variables with designated DB namespace '/ai-image'
        await mongoose.connect(`${process.env.MONGODB_URI}/ai-image`)
    } catch (error) {
        console.error("Database connection error details:", error);
    }

}

export default connectDB;