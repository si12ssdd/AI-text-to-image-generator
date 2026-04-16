// ─────────────────────────────────────────────
// Navbar.jsx
// Top navigation bar that adapts based on auth state.
// Shows different UI for logged-in vs logged-out users.
// ─────────────────────────────────────────────

import React, { useContext } from 'react'
import { assets } from '../assets/assets'          // Static asset paths (logo, icons)
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'  // Global state provider

const Navbar = () => {

    // ── Pull values from global context ──────────────────────────────────
    // user        → null when logged out, object { name, ... } when logged in
    // credit      → number of AI credits remaining for the current user
    // logout      → function to clear session and reset user state
    // setShowLogin → function to toggle the login modal visibility
    const { setShowLogin, user, credit, logout } = useContext(AppContext)

    // useNavigate gives us programmatic navigation (no <Link> needed)
    const navigate = useNavigate()

    return (
        // Flex row: logo on the left, actions on the right
        <div className='flex items-center justify-between py-4'>

            {/* ── Logo ──────────────────────────────────────────────────────
                Wrapped in <Link> so clicking it always goes back to home.
                Responsive width: small on mobile, larger on desktop.         */}
            <Link to='/'>
                <img
                    className='w-28 sm:w-32 lg:w-40'
                    src={assets.logo}
                    alt="Logo"
                />
            </Link>

            {/* ── Right Side: conditional based on auth state ─────────────── */}
            <div>
                {user
                    ? (
                        // ══ LOGGED IN VIEW ════════════════════════════════════
                        // Shown when user object exists in context
                        <div className='flex items-center gap-2 sm:gap-3'>

                            {/* Credits Button
                                - Displays current credit balance
                                - Clicking navigates to /buy (purchase more credits)
                                - hover:scale-105 gives a subtle zoom on hover           */}
                            <button
                                onClick={() => navigate('/buy')}
                                className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6
                                           py-1.5 sm:py-3 rounded-full hover:scale-105
                                           transition-all duration-700'
                            >
                                <img className='w-5' src={assets.credit_star} alt="credits" />
                                <p className='text-xs sm:text-sm font-medium text-gray-600'>
                                    Credits left : {credit}  {/* Live from context */}
                                </p>
                            </button>

                            {/* Greeting Text
                                - Hidden on small screens (max-sm:hidden)
                                - Shows first name from user object                       */}
                            <p className='text-gray-700 max-sm:hidden pl-4'>
                                Hi, {user.name}
                            </p>

                            {/* Profile Icon with Hover Dropdown
                                - `relative group` enables CSS-only hover menu
                                - The dropdown is invisible by default (`hidden`)
                                  and appears on group hover (`group-hover:block`)        */}
                            <div className='relative group'>

                                {/* Trigger: profile avatar image */}
                                <img
                                    className='w-10 drop-shadow'
                                    src={assets.profile_icon}
                                    alt="Profile"
                                />

                                {/* Dropdown Menu
                                    - Positioned absolutely, anchored top-right of avatar
                                    - pt-12 pushes it below the avatar image
                                    - z-10 ensures it floats above other content           */}
                                <div className='absolute hidden group-hover:block
                                                top-0 right-0 z-10 text-white rounded pt-12'>
                                    <ul className='list-none m-0 p-2 bg-white
                                                   rounded-md border text-sm'>
                                        {/* Logout option
                                            - Calls logout() from context on click
                                            - Clears user session globally                 */}
                                        <li
                                            onClick={logout}
                                            className='py-1 px-2 cursor-pointer pr-10
                                                       hover:bg-slate-100 rounded'
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        // ══ END LOGGED IN VIEW ════════════════════════════════
                    )
                    : (
                        // ══ LOGGED OUT VIEW ═══════════════════════════════════
                        // Shown when user is null / not authenticated
                        <div className='flex items-center gap-2 sm:gap-5'>

                            {/* Pricing Link
                                - A plain text link (no button) to the /buy page
                                - Available to guests to see pricing before login         */}
                            <p
                                onClick={() => navigate('/buy')}
                                className='cursor-pointer text-gray-700'
                            >
                                Pricing
                            </p>

                            {/* Login Button
                                - Does NOT navigate; instead opens the login modal
                                - setShowLogin(true) triggers the modal in a parent
                                  component that watches this context value               */}
                            <button
                                onClick={() => setShowLogin(true)}
                                className='bg-zinc-800 text-white px-7 py-2 sm:px-10
                                           sm:py-2 text-sm rounded-full hover:shadow-glow
                                           hover:scale-105 transition-all duration-300'
                            >
                                Login
                            </button>

                        </div>
                        // ══ END LOGGED OUT VIEW ═══════════════════════════════
                    )
                }
            </div>

        </div>
    )
}

export default Navbar