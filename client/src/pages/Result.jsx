// ─────────────────────────────────────────────────────────────────────────────
// Result.jsx
// Image generator workspace page.
// Enables text prompt inputs, feeds inputs to context-level generators,
// shows progress bar animations, and supports base64 image downloads.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Result = () => {

  // ── LOCAL STATE ──────────────────────────────────────────────────────────
  
  // Stores the text prompt written by the user
  const [input, setInput] = useState('')
  
  // Tracks backend API load status to trigger progress bars
  const [loading, setLoading] = useState(false)
  
  // Toggle to switch between "Input Prompt" view and "Download/Regenerate" view
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  
  // Contains the image source string (defaults to initial sample mockup)
  const [image, setImage] = useState(assets.sample_img_1)

  // Retrieve the global API integration handler for generating images
  const { generateImage } = useContext(AppContext)

  /**
   * onSubmitHandler
   * Handles prompt submission.
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault() // prevent from page loading because react refreshes the whole page on every function call
    setLoading(true) // show loader when gen button click

    if (input) {
      // Call the global helper to run backend clipdrop generation
      const imageResult = await generateImage(input)
      if (imageResult) {
        setIsImageLoaded(true) // now Ui changes and gen image is appeared
        setImage(imageResult) // Set output base64 data URL
      }
    }
    setLoading(false) // we hide loader
  }





  return (
    // Animate page container into view
    <motion.form 
      onSubmit={onSubmitHandler} 
      className='flex flex-col min-h-[90vh] justify-center items-center'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >

      {/* Image Output Display Area */}
      <div>
        <div className='relative'>
          {/* Output generated image (or initial sample) */}
          <img className='max-w-sm rounded' src={image} alt="AI output" />
          
          {/* Animated loading bar: grows from w-0 to w-full over 10s if loading is active */}
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
        </div>
        
        {/* Loading text helper */}
        <p className={!loading ? 'hidden' : 'text-center mt-2 text-gray-500'}>Loading.....</p>
      </div>

      {/* INPUT FORM VIEW: Shown if an image has not been generated yet */}
      {!isImageLoaded && (
        <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
          <input 
            onChange={e => setInput(e.target.value)} 
            value={input} 
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 grey-placeholder' 
            type="text" 
            placeholder='Describe what you want to generate' 
          />
          <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>
            Generate
          </button>
        </div>
      )}

      {/* ACTIONS VIEW: Shown once the AI successfully generates and loads an image */}
      {isImageLoaded && (
        <div className='flex gap-2 flex-wrap justify-center text-zinc-900 text-sm p-0.5 mt-10 rounded-full'>
          {/* Go back to input mode */}
          <p 
            onClick={() => { setIsImageLoaded(false) }} 
            className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'
          >
            Generate Another
          </p>
          
          {/* Download Link: points directly to the image URI/base64 payload */}
          <a 
            href={image} 
            download="generated-image.png" 
            className='bg-zinc-900 text-white px-10 py-3 rounded-full cursor-pointer'
          >
            Download
          </a>
        </div>
      )}

    </motion.form>
  )
}

export default Result