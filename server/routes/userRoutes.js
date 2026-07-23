// ─────────────────────────────────────────────────────────────────────────────
// userRoutes.js
// Express router defining user authentication, credits, and payment routes.
// Connects session authorization middleware as needed to protect endpoints.
// ─────────────────────────────────────────────────────────────────────────────

import express from 'express'
import {
    userCredits,
    paymentRazorpay,
    verifyRazorpay,
    registerUser,
    loginUser,
    paymentStripe,
    verifyStripe
} from '../controllers/UserController.js'
import authUser from '../middlewares/auth.js'

const userRouter = express.Router()

// ── Authentication Endpoints ────────────────────────────────────────────────
userRouter.post('/register', registerUser) // Open registration path
userRouter.post('/login', loginUser)       // Open login path

// ── Credit Balance & Payment Endpoints ───────────────────────────────────────

// Protected: Retrieves user credit balance
userRouter.get('/credits', authUser, userCredits)

// Protected: Sets up a pending Razorpay transaction
userRouter.post('/pay-razor', authUser, paymentRazorpay)

// Verification path: Validates transaction status on Razorpay backend
userRouter.post('/verify-razor', verifyRazorpay)

// Protected: Sets up a pending Stripe payment session
userRouter.post('/pay-stripe', authUser, paymentStripe)

// Protected: Verifies Stripe transaction parameters
userRouter.post('/verify-stripe', authUser, verifyStripe)

export default userRouter