// ─────────────────────────────────────────────────────────────────────────────
// auth.js
// Custom Express middleware for user session authentication.
// Intercepts inbound requests, extracts headers, decrypts JWT sessions,
// and maps verified user IDs back to request parameters before invoking handlers.
// ─────────────────────────────────────────────────────────────────────────────

import jwt from 'jsonwebtoken'; 

/**
 * authUser
 * Middleware function that checks for a valid JWT in the 'token' header.
 */
const authUser = async (req, res, next) => {
    // Extract the token parameter directly from the request headers
    const { token } = req.headers;

    // Reject request if no authorization token is supplied
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        // Decode and cryptographically verify the JWT using our environment secret key
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded payload contains a valid user ID ('id' parameter from signing)
        if (tokenDecode.id) {
            // Attach the decoded userId directly to the request body.
            // This propagates the user reference to the next handler/controller down the chain.
            req.body.userId = tokenDecode.id; 
        } else {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        // Pass control to the next middleware or controller callback function in the pipeline
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default authUser; 
