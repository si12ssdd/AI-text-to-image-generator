// ─────────────────────────────────────────────────────────────────────────────
// UserController.js
// Express API controllers handling user authentication and payments.
// Includes endpoints for registration, login, credits balance,
// Razorpay order creation/validation, and Stripe Checkout sessions.
// ─────────────────────────────────────────────────────────────────────────────

import userModel from "../models/userModel.js"
import transactionModel from "../models/transactionModel.js"
import razorpay from 'razorpay';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import stripe from "stripe";

/**
 * registerUser
 * Express Controller: Handles new user registration.
 * Hashes passwords via bcrypt, records user metadata, and returns a JWT token.
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for presence of all required fields
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // Generate salt and hash the plaintext password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // Prep user object
        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        // Store new user document in MongoDB
        const newUser = new userModel(userData)
        const user = await newUser.save()

        // Sign JWT token containing the unique database user ID
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        // Return success response with auth token
        res.json({ success: true, token, user: { name: user.name } })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

/**
 * loginUser
 * Express Controller: Authenticates returning users.
 * Verifies email exists and compares password hashes before signing a JWT token.
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email in database
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        // Compare plaintext password against hashed password in database
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            // Sign JWT token for the session
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token, user: { name: user.name } })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

/**
 * userCredits
 * Express Controller: Fetches the credit balance for a user.
 * The userId is extracted and placed in req.body by the auth middleware.
 */
const userCredits = async (req, res) => {
    try {
        const { userId } = req.body

        // Lookup user details from DB
        const user = await userModel.findById(userId)
        res.json({ success: true, credits: user.creditBalance, user: { name: user.name } })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// ── RAZORPAY GATEWAY SETUP ───────────────────────────────────────────────────

// Initialize the Razorpay client using dashboard keys
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * paymentRazorpay
 * Express Controller: Sets up a pending purchase transaction and creates a Razorpay Order.
 */
const paymentRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body
        const userData = await userModel.findById(userId)

        // Prevent process if data is missing
        if (!userData || !planId) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        let credits, plan, amount, date

        // Map client plan selections to absolute credit amounts and pricing values
        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;

            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;

            default:
                return res.json({ success: false, message: 'plan not found' })
        }

        date = Date.now()

        // Construct transaction record data
        const transactionData = {
            userId,
            plan,
            amount,
            credits,
            date
        }

        // Save a pending transaction record in MongoDB
        const newTransaction = await transactionModel.create(transactionData)

        // Compile Razorpay Order Options (multiplied by 100 to convert to subunit/paise)
        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id.toString(),
        }

        // Instruct Razorpay APIs to create a payment order
        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

/**
 * verifyRazorpay
 * Express Controller: Confirms Razorpay payment success on the server side.
 * Fetches order details, checks payment status, updates user credits database records.
 */
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        // Retrieve order parameters directly from Razorpay APIs to verify authenticity
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        // Check if the payment status is marked 'paid' by the gateway
        if (orderInfo.status === 'paid') {
            
            // Retrieve corresponding transaction record from our DB using receipt ID
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            
            // Prevent double crediting of transactions
            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment Already Processed' })
            }

            // Fetch user profile and add purchase credits to user balance
            const userData = await userModel.findById(transactionData.userId)
            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, { creditBalance })

            // Flag transaction as paid in database
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

            res.json({ success: true, message: "Credits Added" });
        }
        else {
            res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// ── STRIPE GATEWAY SETUP ──────────────────────────────────────────────────────

// Initialize Stripe Client using API Secret Key
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

/**
 * paymentStripe
 * Express Controller: Registers transaction and generates a Stripe Hosted Checkout Session URL.
 */
const paymentStripe = async (req, res) => {
    try {
        const { userId, planId } = req.body
        const { origin } = req.headers // Client origin URL used for checkout redirects

        const userData = await userModel.findById(userId)

        if (!userData || !planId) {
            return res.json({ success: false, message: 'Invalid Credentials' })
        }

        let credits, plan, amount, date

        // Map plan metrics
        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;

            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;

            default:
                return res.json({ success: false, message: 'plan not found' })
        }

        date = Date.now()

        const transactionData = {
            userId,
            plan,
            amount,
            credits,
            date
        }

        // Record pending transaction details in database
        const newTransaction = await transactionModel.create(transactionData)

        // Format currency parameter for Stripe expectations
        const currency = process.env.CURRENCY.toLocaleLowerCase()

        // Compile Stripe line items layout
        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: `Credit Purchase - ${plan} Plan`
                },
                unit_amount: transactionData.amount * 100 // Stripe units are in cents/paise
            },
            quantity: 1
        }]

        // Register checkout session with redirect success/cancel URLs pointing to client /verify route
        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&transactionId=${newTransaction._id}`,
            cancel_url: `${origin}/verify?success=false&transactionId=${newTransaction._id}`,
            line_items: line_items,
            mode: 'payment',
        })
        
        // Return Checkout redirect URL
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

/**
 * verifyStripe
 * Express Controller: Evaluates query params on callback redirection to verify Stripe.
 * Allocates credits and flags database transactions as paid.
 */
const verifyStripe = async (req, res) => {
    try {
        const { transactionId, success } = req.body

        // Verify success indicator sent from callback redirection handler
        if (success === 'true') {
            
            // Retrieve transaction object
            const transactionData = await transactionModel.findById(transactionId)
            
            // Avoid duplicate credit processing
            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment Already Verified' })
            }

            // Top up user credit balance
            const userData = await userModel.findById(transactionData.userId)
            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, { creditBalance })

            // Flag transaction as successful
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

            res.json({ success: true, message: "Credits Added" });
        }
        else {
            res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay, paymentStripe, verifyStripe }