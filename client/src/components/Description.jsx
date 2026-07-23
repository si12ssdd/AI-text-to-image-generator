// ─────────────────────────────────────────────────────────────────────────────
// Description.jsx
// Alternating feature showcase section with glowing image frames, feature pills,
// and scannable value proposition bullets.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Description = () => {
    return (
        <motion.section
            id="description"
            className="flex flex-col items-center justify-center my-28 px-4 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Section Eyebrow & Title */}
            <span className="text-xs font-mono tracking-widest uppercase text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 mb-3.5">
                CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white text-center mb-4">
                Built for creators who demand perfection.
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 text-center max-w-xl mb-16">
                Explore how Imagify empowers designers, marketers, and artists with state-of-the-art AI rendering.
            </p>
            
            {/* Alternating Feature Showcase Container */}
            <div className="w-full space-y-20">
                
                {/* ── Feature Showcase Block 1: Image Left / Copy Right ── */}
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                    
                    {/* Glowing Image Frame */}
                    <div className="relative w-full lg:w-1/2 group">
                        {/* Ambient Color Glow behind image matching visual tones */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/25 to-violet-600/25 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700 pointer-events-none" />
                        
                        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#161619] shadow-2xl group-hover:border-cyan-400/40 transition-colors duration-500">
                            <img
                                src={assets.sample_img_1}
                                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                alt="High fidelity AI output"
                            />
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-cyan-300">
                                4K RESOLUTION
                            </div>
                        </div>
                    </div>
                    
                    {/* Copy Block */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                        <div className="inline-block text-[10px] font-mono tracking-wider text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-md uppercase mb-4">
                            HIGH FIDELITY ENGINE
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                            Prompt-accurate, every single time.
                        </h3>
                        <p className="text-zinc-400 text-sm sm:text-base mb-6 leading-relaxed">
                            Easily bring your most intricate ideas to life. Our precision AI model translates nuanced text descriptions into stunning visual art with zero prompt drift.
                        </p>
                        
                        {/* Checkmark Bullets */}
                        <ul className="space-y-3 text-sm text-zinc-300">
                            <li className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs border border-cyan-500/30">✓</span>
                                <span>Sub-3-second render engine for rapid iteration</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs border border-cyan-500/30">✓</span>
                                <span>Unmatched prompt adherence & lighting fidelity</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs border border-cyan-500/30">✓</span>
                                <span>Full commercial usage rights included</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* ── Feature Showcase Block 2: Copy Left / Image Right ── */}
                <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
                    
                    {/* Copy Block */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                        <div className="inline-block text-[10px] font-mono tracking-wider text-violet-400 bg-violet-400/10 border border-violet-400/20 px-2.5 py-1 rounded-md uppercase mb-4">
                            ENDLESS CREATIVITY
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                            From concept art to product mockups.
                        </h3>
                        <p className="text-zinc-400 text-sm sm:text-base mb-6 leading-relaxed">
                            Whether you're crafting character concepts, UI graphics, or digital marketing campaigns, Imagify delivers production-grade graphics tailored to your aesthetic.
                        </p>
                        
                        {/* Checkmark Bullets */}
                        <ul className="space-y-3 text-sm text-zinc-300">
                            <li className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs border border-violet-500/30">✓</span>
                                <span>Photorealistic rendering & digital art presets</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs border border-violet-500/30">✓</span>
                                <span>Seamless workspace export & instant downloads</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs border border-violet-500/30">✓</span>
                                <span>Unlimited creative flexibility with smart credit top-ups</span>
                            </li>
                        </ul>
                    </div>

                    {/* Glowing Image Frame */}
                    <div className="relative w-full lg:w-1/2 group">
                        {/* Ambient Color Glow behind image matching visual tones */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-violet-600/25 to-cyan-500/25 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700 pointer-events-none" />
                        
                        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#161619] shadow-2xl group-hover:border-violet-400/40 transition-colors duration-500">
                            <img
                                src={assets.sample_img_2}
                                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                alt="Versatile AI artwork"
                            />
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-violet-300">
                                MULTI-STYLE
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </motion.section>
    )
}

export default Description