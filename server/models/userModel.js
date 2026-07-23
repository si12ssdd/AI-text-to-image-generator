// ─────────────────────────────────────────────────────────────────────────────
// userModel.js
// MongoDB/Mongoose Schema definition for application user accounts.
// Maps name, contact email (unique key), encrypted password string, and credit balance.
// ─────────────────────────────────────────────────────────────────────────────

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // User profile display name
    name: { type: String, required: true },
    
    // User email used for sign-in; indexed uniquely in MongoDB
    email: { type: String, required: true, unique: true },
    
    // Encrypted password hash
    password: { type: String, required: true },
    
    // Running balance of remaining AI image generations (defaults to 5 free credits on signup)
    creditBalance: { type: Number, default: 5 },
})

// Prevent recompilation of Mongoose model if it's already compiled in the server cycle
const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel;