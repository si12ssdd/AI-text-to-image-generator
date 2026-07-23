// ─────────────────────────────────────────────────────────────────────────────
// Verify.jsx
// Redirect loading page for Stripe payment verification.
// Extracts checkout transaction parameters from URL search query parameters,
// submits them for backend verification, and redirects back to home on completion.
// ─────────────────────────────────────────────────────────────────────────────

import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {

    // Retrieve search parameters from current window URL path (e.g. ?success=true&transactionId=xyz)
    const [searchParams, setSearchParams] = useSearchParams()

    // Read Stripe success status and transaction reference ID
    const success = searchParams.get("success")
    const transactionId = searchParams.get("transactionId")

    // Consume global variables from AppContext
    const { backendUrl, loadCreditsData, token } = useContext(AppContext)

    // Navigation helper
    const navigate = useNavigate()

    /**
     * verifyStripe
     * Contacts backend to cryptographically confirm the Stripe payment status.
     */
    const verifyStripe = async () => {
        try {
            // Post transaction verification payload to the backend API endpoint
            const { data } = await axios.post(backendUrl + "/api/user/verify-stripe", { success, transactionId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                loadCreditsData() // Reload credits state globally
            } else {
                toast.error(data.message)
            }

            // Redirect back to Home page
            navigate("/")

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    // Fire verification function once the authentication token is fully loaded
    useEffect(() => {
        if (token) {
            verifyStripe()
        }
    }, [token])

    return (
        // Loading Spinner overlay while processing verification callback
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
        </div>
    )
}

export default Verify