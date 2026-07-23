// ─────────────────────────────────────────────────────────────────────────────
// Home.jsx
// Main Landing Page container.
// Composes the primary promotional blocks: Hero Header, Step Instructions,
// Feature Description, User Testimonials, and bottom Call-to-Action.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'

const Home = () => {
  return (
    <div>
        {/* Hero Section */}
        <Header />
        
        {/* "How it works" steps section */}
        <Steps />
        
        {/* Detailed feature intro layout */}
        <Description />
        
        {/* Community showcase gallery section */}
        <Gallery />

        {/* Customer review sliders / grid */}
        <Testimonials />
        
        {/* Bottom CTA block to generate images */}
        <GenerateBtn />
    </div>
  )
}

export default Home