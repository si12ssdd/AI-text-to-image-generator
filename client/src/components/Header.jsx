// ─────────────────────────────────────────────────────────────────────────────
// Header.jsx
// Main landing page hero section designed for a 2026 AI startup aesthetic.
// Features ambient radial glow, dynamic headline, dual CTA, and bento hero visual grid.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    // Retrieve authentication states from the global Context API
    const { user, setShowLogin } = useContext(AppContext)

    // React router navigation hook
    const navigate = useNavigate()

    /**
     * onClickHandler
     * Handles CTA buttons by routing authenticated users to the workspace
     * and prompting guest users with the sign-in modal.
     */
    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    return (
        <motion.section
            className='relative flex flex-col justify-center items-center text-center pt-8 pb-16 overflow-hidden'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Ambient Radial Gradient Background Glow */}
            <div className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] sm:w-[700px] sm:h-[400px] bg-gradient-to-tr from-violet-600/20 via-indigo-500/15 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none -z-10' />

            {/* 1. Eyebrow Badge */}
            <motion.div
                className='inline-flex items-center gap-2.5 bg-white/[0.04] backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-inner'
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
            >
                <span className='flex h-2 w-2 relative'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-2 w-2 bg-cyan-500'></span>
                </span>
                <p className='text-xs sm:text-sm font-medium text-zinc-300 tracking-wide'>
                    ✨ Now generating in under 3 seconds
                </p>
            </motion.div>

            {/* 2. Main Hero Headline */}
            <motion.h1
                className='text-center mx-auto mt-7 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8 }}
            >
                Describe it. Watch it{' '}
                <span className='bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent font-extrabold'>
                    exist.
                </span>
            </motion.h1>

            {/* 3. Subheadline */}
            <motion.p
                className='text-center max-w-2xl mx-auto mt-6 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                A fast, precise text-to-image model built for creators who care about every detail. Just type a prompt, and watch your vision render.
            </motion.p>

            {/* 4. CTA Button Row */}
            <motion.div
                className='flex flex-wrap items-center justify-center gap-4 mt-9'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8 }}
            >
                {/* Primary Gradient CTA */}
                <motion.button
                    className='bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-violet-600/30 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer'
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClickHandler}
                >
                    <span>Start Creating</span>
                    <img className='h-5 w-5 group-hover:rotate-12 transition-transform duration-300' src={assets.star_group} alt="stars" />
                </motion.button>

                {/* Secondary Ghost CTA */}
                <motion.a
                    href="#description"
                    className='bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white font-medium text-sm sm:text-base px-7 py-3.5 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2 cursor-pointer backdrop-blur-md'
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <span>View Showcase</span>
                    <svg className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.a>
            </motion.div>

            {/* 5. Dynamic Hero Visual Bento Showcase */}
            <motion.div
                className='mt-16 w-full max-w-5xl mx-auto px-4'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.9 }}
            >
                <div className='relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/80 group'>
                    
                    {/* Subtle inner card ambient glow */}
                    <div className='absolute -inset-0.5 bg-gradient-to-r from-violet-600/30 to-cyan-500/30 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-1000 -z-10' />

                    {/* Bento Image Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 overflow-hidden rounded-2xl'>
                        
                        {/* Showcase Item 1 */}
                        <div className='relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 group/img shadow-lg'>
                            <img
                                className='w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out'
                                src={assets.sample_img_1}
                                alt="Sample AI visual"
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-3.5'>
                                <p className='text-xs font-mono text-zinc-300 line-clamp-2'>
                                    "Hyper-realistic futuristic cyberpunk warrior, 8k render, octane"
                                </p>
                            </div>
                        </div>

                        {/* Showcase Item 2 */}
                        <div className='relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 group/img shadow-lg hidden sm:block'>
                            <img
                                className='w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out'
                                src={assets.sample_img_2}
                                alt="Sample AI visual"
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-3.5'>
                                <p className='text-xs font-mono text-zinc-300 line-clamp-2'>
                                    "Cinematic fantasy portrait, ethereal glow, photorealistic detail"
                                </p>
                            </div>
                        </div>

                        {/* Showcase Item 3 */}
                        <div className='relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 group/img shadow-lg hidden lg:block'>
                            <img
                                className='w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out'
                                src={assets.sample_img_1}
                                alt="Sample AI visual"
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-3.5'>
                                <p className='text-xs font-mono text-zinc-300 line-clamp-2'>
                                    "Neon dreamscape landscape, soft volumetric lighting, studio shot"
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </motion.section>
    )
}

export default Header