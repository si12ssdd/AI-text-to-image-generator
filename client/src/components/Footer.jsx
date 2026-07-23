// ─────────────────────────────────────────────────────────────────────────────
// Footer.jsx
// Multi-column dark footer section featuring brand wordmark, trust signals,
// category navigation links, social icons, and system operational badge.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-full pt-16 pb-10 border-t border-white/10 mt-32 text-zinc-400 text-sm'>
      <div className='max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-10 mb-12'>
        
        {/* Column 1: Brand Info & Status Indicator (2-cols wide on md) */}
        <div className='md:col-span-2 space-y-4'>
          <Link to='/' className='flex items-center gap-2.5 group inline-flex'>
            <div className='flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/15 group-hover:border-cyan-400/50 transition-all duration-300 shadow-inner'>
              <svg className="w-4 h-4 text-cyan-400 group-hover:text-violet-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
            <span className='text-xl font-bold tracking-tight text-white font-sans'>
              imagify
            </span>
          </Link>
          <p className='text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed'>
            A fast, precise text-to-image AI engine built for creators who demand sub-second rendering and photorealistic fidelity.
          </p>

          {/* Status Indicator Badge */}
          <div className='inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-mono text-emerald-400'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
            <span>All systems operational</span>
          </div>
        </div>

        {/* Column 2: Product */}
        <div className='space-y-3'>
          <h4 className='text-xs font-mono tracking-widest uppercase text-white font-semibold'>Product</h4>
          <ul className='space-y-2 text-xs'>
            <li><a href="#steps" className='hover:text-white transition-colors'>Features</a></li>
            <li><a href="#description" className='hover:text-white transition-colors'>Showcase</a></li>
            <li><Link to="/buy" className='hover:text-white transition-colors'>Pricing</Link></li>
            <li><span className='text-zinc-600 cursor-not-allowed'>API Access</span></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div className='space-y-3'>
          <h4 className='text-xs font-mono tracking-widest uppercase text-white font-semibold'>Company</h4>
          <ul className='space-y-2 text-xs'>
            <li><span className='hover:text-white cursor-pointer transition-colors'>About Us</span></li>
            <li><span className='hover:text-white cursor-pointer transition-colors'>Blog</span></li>
            <li><span className='hover:text-white cursor-pointer transition-colors'>Careers</span></li>
            <li><span className='hover:text-white cursor-pointer transition-colors'>Press Kit</span></li>
          </ul>
        </div>

        {/* Column 4: Resources & Social */}
        <div className='space-y-3'>
          <h4 className='text-xs font-mono tracking-widest uppercase text-white font-semibold'>Connect</h4>
          <div className='flex items-center gap-3 pt-1'>
            <a href="#" className='p-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all'>
              <img className='w-4 h-4 invert opacity-75 hover:opacity-100' src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="#" className='p-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all'>
              <img className='w-4 h-4 invert opacity-75 hover:opacity-100' src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="#" className='p-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all'>
              <img className='w-4 h-4 invert opacity-75 hover:opacity-100' src={assets.instagram_icon} alt="Instagram" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className='max-w-6xl mx-auto px-4 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3'>
        <p>© 2026 Imagify Inc. All rights reserved.</p>
        <div className='flex gap-4'>
          <span className='hover:text-zinc-300 cursor-pointer transition-colors'>Privacy Policy</span>
          <span className='hover:text-zinc-300 cursor-pointer transition-colors'>Terms of Service</span>
          <span className='hover:text-zinc-300 cursor-pointer transition-colors'>Security</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer