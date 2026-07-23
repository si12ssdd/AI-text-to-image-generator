// ─────────────────────────────────────────────
// Navbar.jsx
// Floating glassmorphic top navigation bar designed for a 2026 AI startup aesthetic.
// Adapts dynamically on scroll and reflects authenticated user state.
// ─────────────────────────────────────────────

import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { setShowLogin, user, credit, logout } = useContext(AppContext)
    const navigate = useNavigate()

    // Scroll state for shrinking navbar & increasing opacity on scroll
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className="sticky top-4 z-50 w-full mb-6 transition-all duration-300">
            <nav
                className={`mx-auto flex items-center justify-between transition-all duration-300 rounded-full border border-white/10 backdrop-blur-xl ${
                    scrolled
                        ? 'py-2.5 px-5 sm:px-7 bg-[#0A0A0C]/90 shadow-2xl shadow-black/80 border-white/15'
                        : 'py-3.5 px-6 sm:px-8 bg-[#111114]/65 shadow-xl shadow-black/40'
                }`}
            >
                {/* ── Logo ── */}
                <Link to='/' className='flex items-center gap-2.5 group'>
                    <div className='flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/15 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-105 shadow-inner'>
                        <svg className="w-4 h-4 text-cyan-400 group-hover:text-violet-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                        </svg>
                    </div>
                    <span className='text-lg font-bold tracking-tight text-white font-sans group-hover:text-zinc-200 transition-colors'>
                        imagify
                    </span>
                </Link>

                {/* ── Navigation Links ── */}
                <div className='hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/5 py-1 px-2 rounded-full'>
                    <a
                        href="#steps"
                        className='text-xs font-medium text-zinc-400 hover:text-white px-3.5 py-1.5 rounded-full transition-all hover:bg-white/10'
                    >
                        Features
                    </a>
                    <a
                        href="#description"
                        className='text-xs font-medium text-zinc-400 hover:text-white px-3.5 py-1.5 rounded-full transition-all hover:bg-white/10'
                    >
                        Showcase
                    </a>
                    <button
                        onClick={() => navigate('/buy')}
                        className='text-xs font-medium text-zinc-400 hover:text-white px-3.5 py-1.5 rounded-full transition-all hover:bg-white/10'
                    >
                        Pricing
                    </button>
                </div>

                {/* ── Right Action Buttons (Auth Dependent) ── */}
                <div className='flex items-center gap-3 sm:gap-4'>
                    {user ? (
                        /* ══ LOGGED IN VIEW ══ */
                        <div className='flex items-center gap-2.5 sm:gap-4'>
                            {/* Credits Pill Button */}
                            <button
                                onClick={() => navigate('/buy')}
                                className='flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/30 hover:border-cyan-400/50 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group shadow-md shadow-violet-950/20'
                            >
                                <img className='w-4 h-4 group-hover:rotate-12 transition-transform duration-300' src={assets.credit_star} alt="credits" />
                                <span className='text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white transition-colors'>
                                    Credits: <span className='text-cyan-400 font-semibold'>{credit}</span>
                                </span>
                            </button>

                            {/* User Name Greeting */}
                            <span className='text-zinc-300 text-sm font-medium max-sm:hidden pl-1'>
                                Hi, <span className='text-white font-semibold'>{user.name}</span>
                            </span>

                            {/* Profile Dropdown */}
                            <div className='relative group'>
                                <button className='flex items-center justify-center p-0.5 rounded-full border border-white/20 group-hover:border-violet-500/60 transition-all duration-300 shadow-md'>
                                    <img
                                        className='w-8 h-8 rounded-full object-cover'
                                        src={assets.profile_icon}
                                        alt="Profile"
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                <div className='absolute hidden group-hover:block top-full right-0 pt-2 z-50 min-w-[140px]'>
                                    <div className='bg-[#161619]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-2xl shadow-black/90 text-sm'>
                                        <button
                                            onClick={logout}
                                            className='w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors'
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* ══ LOGGED OUT VIEW ══ */
                        <div className='flex items-center gap-2 sm:gap-3'>
                            {/* Sign In - Ghost text button */}
                            <button
                                onClick={() => setShowLogin(true)}
                                className='text-xs sm:text-sm font-medium text-zinc-400 hover:text-white px-3 sm:px-4 py-2 rounded-full transition-colors'
                            >
                                Sign in
                            </button>

                            {/* Get Started - High-contrast Gradient Pill button */}
                            <button
                                onClick={() => setShowLogin(true)}
                                className='bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-medium px-5 sm:px-6 py-2 rounded-full shadow-lg shadow-violet-600/30 hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300'
                            >
                                Get Started
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar