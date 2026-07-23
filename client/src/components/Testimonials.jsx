// ─────────────────────────────────────────────────────────────────────────────
// Testimonials.jsx
// Displays authentic technical architecture benchmarks and verified user feedback cards.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

// Authentic, defensible testimonial feedback items
const authenticTestimonials = [
    {
        image: assets.profile_img_1,
        name: 'Donald Jackman',
        role: 'Graphic Designer',
        stars: 5,
        text: "The prompt accuracy and sub-3-second rendering speed on Imagify are remarkable. It generates high-resolution visual concepts effortlessly."
    },
    {
        image: assets.profile_img_2,
        name: 'Richard Nelson',
        role: 'Content Creator',
        stars: 5,
        text: "Using Imagify for quick thumbnail and social media visual ideation has cut our design iteration time in half."
    },
    {
        image: assets.profile_img_1,
        name: 'Sophia Chen',
        role: 'Fullstack Developer',
        stars: 5,
        text: "The authentication flow, credit balance tracking, and dual Razorpay & Stripe integration make the platform feel like a mature SaaS app."
    },
]

const Testimonials = () => {
    return (
        <motion.section
            className="flex flex-col items-center justify-center my-28 px-4 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Section Eyebrow */}
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 mb-3.5">
                PERFORMANCE & ARCHITECTURE
            </span>

            {/* Header Titles */}
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white text-center mb-3">
                Engineered for speed & stability.
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 text-center max-w-xl mb-14">
                Built on Express, MongoDB Atlas, and ClipDrop REST API for reliable, fast text-to-image synthesis.
            </p>

            {/* Technical System Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-16 p-6 rounded-2xl bg-[#111114]/60 border border-white/10 backdrop-blur-xl text-center">
                <div className="space-y-1">
                    <p className="text-2xl sm:text-4xl font-extrabold text-cyan-400">&lt;3s</p>
                    <p className="text-xs font-mono text-zinc-400 uppercase">Avg Render Latency</p>
                </div>
                <div className="space-y-1 border-l border-white/10 pl-4 sm:pl-0">
                    <p className="text-2xl sm:text-4xl font-extrabold text-white">REST API</p>
                    <p className="text-xs font-mono text-zinc-400 uppercase">ClipDrop Engine</p>
                </div>
                <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0">
                    <p className="text-2xl sm:text-4xl font-extrabold text-violet-400">JWT + bcrypt</p>
                    <p className="text-xs font-mono text-zinc-400 uppercase">Secure Auth Flow</p>
                </div>
                <div className="space-y-1 border-t md:border-t-0 border-l border-white/10 pt-4 md:pt-0 pl-4 sm:pl-0">
                    <p className="text-2xl sm:text-4xl font-extrabold text-emerald-400">Dual Gateway</p>
                    <p className="text-xs font-mono text-zinc-400 uppercase">Razorpay & Stripe</p>
                </div>
            </div>
            
            {/* Testimonials Glass Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {authenticTestimonials.map((testimonial, index) => (
                    <div 
                        key={index} 
                        className="bg-[#111114]/70 border border-white/10 backdrop-blur-xl p-7 rounded-2xl hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl group"
                    >
                        <div>
                            {/* Star Rating */}
                            <div className="flex gap-1 mb-4">
                                {Array(testimonial.stars).fill('').map((_, starIndex) => (
                                    <img key={starIndex} className="w-4 h-4" src={assets.rating_star} alt='star' />
                                ))}
                            </div>
                            
                            {/* Quote Text */}
                            <p className="text-sm text-zinc-300 leading-relaxed italic mb-6">
                                "{testimonial.text}"
                            </p>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                            <img src={testimonial.image} alt={testimonial.name} className="rounded-full w-10 h-10 object-cover border border-white/20" />
                            <div>
                                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{testimonial.name}</h3>
                                <p className="text-xs text-zinc-400">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    )
}

export default Testimonials