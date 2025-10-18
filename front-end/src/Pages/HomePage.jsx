import React from 'react'
import HeroSection from '../components/HeroSection'
import StatistiquesSection from '../components/StatistiqueSection'
import PropertiesSection from '../components/PropertiesSection'
import HowItWork from '../components/HowItWork'
import CTA from '../components/CTA'

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