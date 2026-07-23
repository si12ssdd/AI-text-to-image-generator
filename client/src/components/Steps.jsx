// ─────────────────────────────────────────────────────────────────────────────
// Steps.jsx
// Displays horizontal glass cards with mini interface snippets, ghost numerals,
// and hover glows explaining how the AI image generator works.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Steps = () => {
  // Custom interface preview fragments for each step
  const stepMockups = [
    // Step 01: Prompt input mockup snippet
    (
      <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-zinc-300 font-mono flex items-center justify-between gap-2 shadow-inner">
        <span className="truncate text-zinc-400">"Cyberpunk samurai in neon rain..."</span>
        <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 text-[10px] border border-violet-500/30">Prompt</span>
      </div>
    ),
    // Step 02: Shimmer loading state mockup
    (
      <div className="bg-black/40 border border-white/10 rounded-xl p-3 flex items-center gap-3 shadow-inner">
        <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
        <div className="w-full space-y-1.5">
          <div className="h-2 bg-white/20 rounded-full animate-pulse w-3/4" />
          <div className="h-2 bg-white/10 rounded-full animate-pulse w-1/2" />
        </div>
      </div>
    ),
    // Step 03: Result status pill mockup
    (
      <div className="bg-black/40 border border-white/10 rounded-xl p-3 flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-zinc-200">Render Complete</span>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">4K Ready</span>
      </div>
    )
  ]

  return (
    <motion.section
      id="steps"
      className="flex flex-col items-center justify-center my-28 px-4"
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Eyebrow Label */}
      <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 mb-3.5">
        PROCESS
      </span>

      {/* Main Headline */}
      <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white text-center mb-3">
        From words to art — three steps, no friction.
      </h2>
      <p className="text-base sm:text-lg text-zinc-400 text-center max-w-xl mb-14">
        Our streamlined rendering pipeline transforms complex text prompts into high-resolution visual assets seamlessly.
      </p>

      {/* Horizontal 3-Column Glass Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="group relative bg-[#111114]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-500 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-950/30 overflow-hidden"
          >
            {/* Top-Left Ambient Card Glow */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

            <div>
              {/* Card Header: Mini UI Mockup & Ghost Numeral */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-full">
                  {stepMockups[index] || (
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <img width={20} src={item.icon} alt="step icon" />
                    </div>
                  )}
                </div>
                <span className="text-3xl font-mono font-bold text-white/15 group-hover:text-cyan-400/40 transition-colors select-none">
                  0{index + 1}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            {/* Bottom Accent Highlight Bar on Hover */}
            <div className="mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500 rounded-full" />
          </div>
        ))}
      </div>
    </motion.section>
  )
}

export default Steps