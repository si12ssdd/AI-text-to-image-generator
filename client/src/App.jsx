// ─────────────────────────────────────────────────────────────────────────────
// App.jsx
// Main entry component for the React application.
// Handles routing, main page layout wrapper, and toast notifications.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

// Import page components
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Verify from './pages/Verify'

// Import layout components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'

// Toast notification components (global alert popups)
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Global data store like token , credit , showlogin , gen images.
import { AppContext } from './context/AppContext'

const App = () => {

  // Retrieve showLogin state from global context to conditionally display the Login modal
  const { showLogin } = useContext(AppContext)

  return (
    // Main wrapper with styling for standard horizontal padding across breakpoints,
    // minimum full screen height, and dark off-black canvas background.
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-[#0A0A0C] text-[#F4F4F5] selection:bg-cyan-500/30 selection:text-cyan-200'>
      
      {/* Toast Notification Container to trigger alerts anywhere in the application */}
      <ToastContainer position='bottom-right' />
      
      {/* Global Header Navigation Bar */}
      <Navbar />
      
      {/* Conditionally render the Login Modal Overlay if showLogin context state is true */}
      {showLogin && <Login />}
      
      {/* Application Routing Configuration */}
      <Routes>
        {/* Home / landing page */}
        <Route path='/' element={<Home />} />
        
        {/* Page where users see generated images and enter prompts */}
        <Route path='/result' element={<Result />} />
        
        {/* Pricing page to buy more credits */}
        <Route path='/buy' element={<BuyCredit />} />
        
        {/* Verification page for backend payment callback routing */}
        <Route path='/verify' element={<Verify />} />
      </Routes>
      
      {/* Global Footer Section */}
      <Footer />
    </div>
  )
}

export default App