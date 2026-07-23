// ─────────────────────────────────────────────────────────────────────────────
// AppContext.jsx
// React Context for application-wide state management.
// Handles authentication tokens, user metadata, remaining credit balances,
// and utility functions for interacting with the backend API.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

// Create the context object to import in components that consume this state
export const AppContext = createContext()

const AppContextProvider = (props) => {

    // ── STATE VARIABLES ──────────────────────────────────────────────────────
    
    // Controls the visibility of the Login/Register overlay modal
    const [showLogin, setShowLogin] = useState(false)
    
    // Auth token stored in state, initialized from browser localStorage
    const [token, setToken] = useState(localStorage.getItem('token'))
    
    // User profile object (contains details like name, etc.)
    const [user, setUser] = useState(null)
    
    // The amount of credits left for generation (usually a number)
    const [credit, setCredit] = useState(false)

    // Backend URL retrieved from Vite's environment variables
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    // Navigate hook for programmatic routing changes
    const navigate = useNavigate()

    // ── API UTILITIES ────────────────────────────────────────────────────────

    /**
     * loadCreditsData
     * Fetches current user profile and credit count from the server.
     * Uses the Authorization token in the request headers.
     */
    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token } })
            
            if (data.success) {
                // Update local credit count and user information state
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    /**
     * generateImage
     * Requests the backend to generate an image based on a text prompt.
     * @param {string} prompt - The text prompt describing the image.
     * @returns {string} The base64-encoded image source string.
     */
    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt }, { headers: { token } })

            if (data.success) {
                // Refresh credits dynamically on a successful generation
                loadCreditsData()
                return data.resultImage
            } else {
                toast.error(data.message)
                loadCreditsData()
                
                // Redirect user to the purchase page if they are out of credits
                if (data.creditBalance === 0) {
                    navigate('/buy')
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    /**
     * logout
     * Log the user out of the application by clearing authentication tokens
     * and resetting the local user context states.
     */
    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }

    // ── SIDE EFFECTS ─────────────────────────────────────────────────────────

    // Automatically load user credit details whenever the user's auth token changes
    useEffect(()=>{
        if (token) {
            loadCreditsData()
        }
    },[token])

    // Context bundle containing state and handlers to expose to consumers
    const value = {
        token, setToken,
        user, setUser,
        showLogin, setShowLogin,
        credit, setCredit,
        loadCreditsData,
        backendUrl,
        generateImage,
        logout
    }

    return (
        // Provide the global variables and functions to all child components
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider