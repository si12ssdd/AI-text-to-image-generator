// ─────────────────────────────────────────────────────────────────────────────
// GenerateBtn.jsx
// Standalone dramatic final Call-To-Action moment section.
// Features radial ambient glow, high-voice headline, and electric gradient CTA button.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
            scrollTo(0, 0)
        } else {
            scrollTo(0, 0)
            setShowLogin(true)
        }
    }

    return (
        <motion.section
            className='relative py-24 text-center overflow-hidden my-16 rounded-3xl bg-gradient-to-b from-[#111114]/80 to-[#0A0A0C] border border-white/10 backdrop-blur-xl max-w-5xl mx-auto px-4 shadow-2xl'
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Ambient Radial Gradient Glow */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-violet-600/20 via-indigo-500/15 to-cyan-500/20 rounded-full blur-[100px] pointer-events-none -z-10' />

            {/* Headline */}
            <h2 className='text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4'>
                Start creating in seconds.
            </h2>
            <p className='text-base sm:text-lg text-zinc-400 max-w-md mx-auto mb-9 font-normal'>
                Transform your text prompts into studio-quality visual artwork instantly.
            </p>

            {/* Clickable CTA Button */}
            <motion.button 
                onClick={onClickHandler} 
                className='inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-base shadow-xl shadow-violet-600/30 hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer group'
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
            >
                <span>Generate Images</span>
                <img className='h-5 w-5 group-hover:rotate-12 transition-transform duration-300' src={assets.star_group} alt="magic stars" />
            </motion.button>
        </motion.section>
    )
}

export default GenerateBtn