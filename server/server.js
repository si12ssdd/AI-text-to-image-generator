// ─────────────────────────────────────────────────────────────────────────────
// server.js
// Entry point for the Express backend server application.
// Configures middlewares, initiates database connections, registers routing,
// and starts listening on designated network ports.
// ─────────────────────────────────────────────────────────────────────────────

import 'dotenv/config'; // Automatically loads environment variables from .env file
import express from 'express'
import cors from 'cors'

// Database and Route handler imports
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

// Application Configuration ports (default to 4000)
const PORT = process.env.PORT || 4000
const app = express();

// Establish connection to MongoDB Atlas database
await connectDB()

// ── INITIALISE MIDDLEWARES ───────────────────────────────────────────────────

// Parses incoming requests containing JSON payloads (makes req.body available)
app.use(express.json())

// Enables Cross-Origin Resource Sharing (CORS) so the client app can make requests
app.use(cors())

// ── ROUTING REGISTER ─────────────────────────────────────────────────────────

// Map base routes to corresponding routers
app.use('/api/user', userRouter)   // Routes relating to user login, signup, payments
app.use('/api/image', imageRouter) // Routes relating to AI image generation

// Base Health Check endpoint
app.get('/', (req, res) => res.send("API Working"))

// Open port listener to serve incoming requests
app.listen(PORT, () => console.log('Server running on port ' + PORT));

export default app;
