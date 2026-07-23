// ─────────────────────────────────────────────────────────────────────────────
// imageController.js
// Express API controller handling AI image generation requests.
// Validates user credit balances, constructs multipart/form-data payload,
// makes HTTP requests to Clipdrop API, processes output buffers to base64,
// and deducts user credit balances.
// ─────────────────────────────────────────────────────────────────────────────

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

/**
 * generateImage
 * Express Controller: Processes text-to-image requests.
 * Endpoint: POST /api/image/generate-image
 */
export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body

    // Retrieve full user profile using userId populated from auth middleware
    const user = await userModel.findById(userId)
    
    // Validate request data
    if (!user || !prompt) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    // Verify user has at least 1 credit remaining
    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    // Construct a multipart/form-data container for the Clipdrop request
    const formdata = new FormData()
    formdata.append('prompt', prompt)

    // Call the external Clipdrop AI Text-to-Image API v1
    // Expects response type 'arraybuffer' to process the binary image payload
    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API, // Secret API key loaded from environment
      },
      responseType: "arraybuffer"
    })

    // Convert the returned binary data buffer to base64 format string
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    
    // Construct standard Data URL representation for standard HTML img src consumption
    const resultImage = `data:image/png;base64,${base64Image}`

    // Deduct 1 credit from the user's account balance
    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

    // Return the generated image along with the remaining credit balance
    res.json({ success: true, message: "Image Generated", resultImage, creditBalance: user.creditBalance - 1 })

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}