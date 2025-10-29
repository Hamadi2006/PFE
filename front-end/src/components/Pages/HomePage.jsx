import React from 'react'
import HeroSection from '../client/HeroSection'
import StatistiquesSection from '../client/StatistiqueSection'
import PropertiesSection from '../client/PropertiesSection'
import HowItWork from '../client/HowItWork'
import CTA from '../client/CTA'

function HomePage() {
  return (
    <>
  <HeroSection />

  <StatistiquesSection />

  <PropertiesSection />

  <HowItWork/>

  <CTA/>
    </>

  )
}

export default HomePage