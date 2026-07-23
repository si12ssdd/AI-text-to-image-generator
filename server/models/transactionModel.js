// ─────────────────────────────────────────────────────────────────────────────
// transactionModel.js
// MongoDB/Mongoose Schema definition for user financial purchase transaction logs.
// Keeps record of pricing plan, purchase cost, credits allocated, payment status, and timestamps.
// ─────────────────────────────────────────────────────────────────────────────

import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    // ID reference of the user executing the transaction
    userId: { type: String, required: true },
    
    // Plan selected (e.g. 'Basic', 'Advanced', 'Business')
    plan: { type: String, required: true },
    
    // Cost of the plan purchased
    amount: { type: Number, required: true },
    
    // The number of credits to assign to the user on success
    credits: { type: Number, required: true },
    
    // Status flag: false = pending, true = fully paid & processed
    payment: { type: Boolean, default: false },
    
    // Timestamp representation of transaction creation
    date: { type: Number },
})

// Prevent recompilation of Mongoose model if it's already compiled in the server cycle
const transactionModel = mongoose.models.transaction || mongoose.model("transaction", transactionSchema);

export default transactionModel;