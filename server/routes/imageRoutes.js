// ─────────────────────────────────────────────────────────────────────────────
// imageRoutes.js
// Express router defining image generation routes.
// Connects authentication middlewares to generation controllers.
// ─────────────────────────────────────────────────────────────────────────────

import express from 'express'
import { generateImage } from '../controllers/imageController.js'
import authUser from '../middlewares/auth.js'

const imageRouter = express.Router()

// Route: POST /api/image/generate-image
// Authenticates user session before executing generation logic
imageRouter.post('/generate-image', authUser, generateImage)

export default imageRouter