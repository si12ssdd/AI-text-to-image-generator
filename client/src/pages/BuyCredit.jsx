// ─────────────────────────────────────────────────────────────────────────────
// BuyCredit.jsx
// Pricing plans page for purchasing AI generation credits.
// Redesigned for 2026 AI startup visual direction with 3-tier elevated cards,
// billing toggle, feature checklists, and Razorpay/Stripe checkout handlers.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useContext, useState } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion } from 'framer-motion'

const BuyCredit = () => {
  const { backendUrl, loadCreditsData, user, token, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()
  const [billingCycle, setBillingCycle] = useState('monthly') // 'monthly' | 'yearly'

  // Per-plan feature checklist items
  const planFeatures = {
    Basic: [
      '100 Generation credits',
      'Sub-3s render engine access',
      'Standard resolution outputs',
      'Community support',
    ],
    Advanced: [
      '500 Generation credits',
      'Priority render queue access',
      '4K Ultra-HD resolution exports',
      'Full commercial usage rights',
      'Dedicated email support',
    ],
    Business: [
      '5,000 Generation credits',
      'Dedicated server rendering cluster',
      'Enterprise API & team seat access',
      'Full commercial usage rights',
      '24/7 Priority support & account manager',
    ],
  }

  /**
   * initPay
   * Initialises the Razorpay payment modal using Razorpay's window SDK.
   */
  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-razor', response, { headers: { token } })
          if (data.success) {
            loadCreditsData()
            navigate('/')
            toast.success('Credit Added')
          }
        } catch (error) {
          toast.error(error.message)
        }
      },
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  /**
   * paymentRazorpay
   */
  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true)
        return
      }
      const { data } = await axios.post(backendUrl + '/api/user/pay-razor', { planId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  /**
   * paymentStripe
   */
  const paymentStripe = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true)
        return
      }
      const { data } = await axios.post(backendUrl + '/api/user/pay-stripe', { planId }, { headers: { token } })
      if (data.success) {
        const { session_url } = data
        window.location.replace(session_url)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <motion.section
      className="min-h-[85vh] text-center pt-10 pb-20 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Eyebrow Label */}
      <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/20 mb-3.5 inline-block">
        PRICING & CREDITS
      </span>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
        Flexible plans for every workflow.
      </h1>
      <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto mb-10">
        Simple, transparent credit packs. No hidden fees or recurring lock-in.
      </p>

      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center gap-3 mb-14">
        <div className="bg-[#111114]/90 p-1 rounded-full border border-white/10 flex items-center gap-1 backdrop-blur-xl">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`text-xs font-medium px-4 py-1.5 rounded-full transition-all duration-300 ${
              billingCycle === 'monthly'
                ? 'bg-white/10 text-white font-semibold shadow-inner'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`text-xs font-medium px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold shadow-inner'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Yearly
          </button>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
          Save 20%
        </span>
      </div>

      {/* Plans 3-Tier Card Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-left">
        {plans.map((item, index) => {
          const isPopular = item.id === 'Advanced'
          const features = planFeatures[item.id] || []

          return (
            <div
              key={index}
              className={`relative rounded-3xl p-7 sm:p-8 transition-all duration-500 flex flex-col justify-between ${
                isPopular
                  ? 'bg-gradient-to-b from-[#181820] to-[#121216] border-2 border-violet-500/60 shadow-2xl shadow-violet-950/50 md:-translate-y-3 z-10'
                  : 'bg-[#111114]/70 border border-white/10 backdrop-blur-xl hover:border-white/20'
              }`}
            >
              {/* Most Popular Badge */}
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-[11px] font-mono tracking-wider font-bold px-3.5 py-0.5 rounded-full shadow-lg shadow-violet-600/40 uppercase">
                  MOST POPULAR
                </div>
              )}

              <div>
                {/* Header: Icon & Plan ID */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <img width={20} src={assets.logo_icon} alt="plan icon" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    {item.credits} Credits
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{item.id}</h3>
                <p className="text-xs text-zinc-400 mb-6">{item.desc}</p>

                {/* Price Display */}
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">₹{item.price}</span>
                  <span className="text-sm text-zinc-400 font-mono">/ pack</span>
                </div>

                {/* Divider Line */}
                <div className="h-px w-full bg-white/10 mb-6" />

                {/* Features Checklist */}
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300 mb-8">
                  {features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5">
                      <span className={`flex items-center justify-center w-4 h-4 rounded-full text-[10px] ${
                        isPopular ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-zinc-300'
                      }`}>
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Gateway Actions */}
              <div className="space-y-2.5 mt-4">
                {/* Razorpay Option */}
                <button
                  onClick={() => paymentRazorpay(item.id)}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all duration-300 shadow-md ${
                    isPopular
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-violet-600/30 hover:scale-[1.02]'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:scale-[1.02]'
                  }`}
                >
                  <span>Pay with</span>
                  <img className="h-3.5 invert brightness-200" src={assets.razorpay_logo} alt="Razorpay" />
                </button>

                {/* Stripe Option */}
                <button
                  onClick={() => paymentStripe(item.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium bg-black/40 hover:bg-black/60 text-zinc-300 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Pay with</span>
                  <img className="h-3.5 invert brightness-200" src={assets.stripe_logo} alt="Stripe" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}

export default BuyCredit