// ─────────────────────────────────────────────────────────────────────────────
// Login.jsx
// Interactive Login and Sign Up overlay modal redesigned for 2026 AI startup visual direction.
// Controls user form inputs, handles authentication endpoints (login/register)
// via Axios, saves tokens in LocalStorage, and locks scrolling while active.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const Login = () => {
    // Toggles between 'Login' and 'Sign Up' flow views
    const [state, setState] = useState('Login')
    
    // Controlled inputs for registration and login
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Retrieve authentication/context setters from AppContext
    const { backendUrl, setShowLogin, setToken, setUser } = useContext(AppContext)

    /**
     * onSubmitHandler
     */
    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            if (state === 'Login') {
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Blocks main body scrolling when this component mounts, reverts it on unmount
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className='fixed inset-0 z-50 backdrop-blur-xl bg-black/75 flex justify-center items-center p-4'>
            {/* Animating the form modal card into position */}
            <motion.form 
                onSubmit={onSubmitHandler} 
                className='relative bg-[#111114] border border-white/10 shadow-2xl shadow-black/90 rounded-3xl p-8 sm:p-10 w-full max-w-md text-zinc-300 overflow-hidden'
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
            >
                {/* Top Ambient Card Glow */}
                <div className="absolute -top-16 -left-16 w-36 h-36 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Close Button */}
                <button 
                    type="button"
                    onClick={() => setShowLogin(false)} 
                    className='absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/10 cursor-pointer'
                >
                    <img className='w-3.5 h-3.5 invert' src={assets.cross_icon} alt="Close" />
                </button>

                {/* Mode Tab Switcher Header */}
                <div className="flex items-center justify-center gap-1 bg-black/40 p-1 rounded-full border border-white/10 mb-6 max-w-[220px] mx-auto">
                    <button
                        type="button"
                        onClick={() => setState('Login')}
                        className={`w-1/2 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                            state === 'Login'
                                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md'
                                : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        Sign In
                    </button>
                    <button
                        type="button"
                        onClick={() => setState('Sign Up')}
                        className={`w-1/2 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                            state === 'Sign Up'
                                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md'
                                : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        Register
                    </button>
                </div>

                {/* Mode Title & Subline */}
                <h1 className='text-center text-2xl text-white font-bold tracking-tight mb-1'>
                    {state === 'Login' ? 'Welcome Back' : 'Create an Account'}
                </h1>
                <p className='text-xs text-zinc-400 text-center mb-6'>
                    {state === 'Login'
                        ? 'Sign in to access your credits & workspace'
                        : 'Join Imagify and start generating in under 3 seconds'}
                </p>

                <div className="space-y-4">
                    {/* Full Name Field (Sign Up Only) */}
                    {state !== 'Login' && (
                        <div className='relative'>
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input 
                                onChange={e => setName(e.target.value)} 
                                value={name} 
                                className='w-full bg-black/50 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white text-sm placeholder-zinc-500 rounded-xl pl-10 pr-4 py-3 outline-none transition-all' 
                                type="text" 
                                placeholder='Full Name' 
                                required 
                            />
                        </div>
                    )}

                    {/* Email Input Field */}
                    <div className='relative'>
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <input 
                            onChange={e => setEmail(e.target.value)} 
                            value={email} 
                            className='w-full bg-black/50 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white text-sm placeholder-zinc-500 rounded-xl pl-10 pr-4 py-3 outline-none transition-all' 
                            type="email" 
                            placeholder='Email address' 
                            required 
                        />
                    </div>

                    {/* Password Input Field */}
                    <div className='relative'>
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input 
                            onChange={e => setPassword(e.target.value)} 
                            value={password} 
                            className='w-full bg-black/50 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white text-sm placeholder-zinc-500 rounded-xl pl-10 pr-4 py-3 outline-none transition-all' 
                            type="password" 
                            placeholder='Password' 
                            required
                        />
                    </div>
                </div>

                {/* Password Reset Helper */}
                {state === 'Login' && (
                    <div className="flex justify-end mt-2">
                        <span className='text-xs text-zinc-400 hover:text-cyan-400 cursor-pointer transition-colors'>
                            Forgot password?
                        </span>
                    </div>
                )}

                {/* Submit Action Button */}
                <button className='w-full mt-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-violet-600/30 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 text-sm cursor-pointer'>
                    {state === 'Login' ? 'Sign In' : 'Create Account'}
                </button>

                {/* Switch between Sign Up and Login states */}
                <div className="mt-6 text-center text-xs text-zinc-400">
                    {state === "Login" ? (
                        <p>
                            Don't have an account?{' '}
                            <span onClick={() => setState('Sign Up')} className='text-cyan-400 hover:underline cursor-pointer font-semibold'>
                                Sign up
                            </span>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <span onClick={() => setState('Login')} className='text-cyan-400 hover:underline cursor-pointer font-semibold'>
                                Log in
                            </span>
                        </p>
                    )}
                </div>
            </motion.form>
        </div>
    )
}

export default Login