import React from 'react'
import { HeroSection } from './Components/HeroSection/HeroSection';
import Cateogirze from './Components/Cateogirze/Cateogirze';
import OurProducts from './Components/OurProducts/OurProducts';
import Services from './Components/Services/Services';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <Cateogirze/>
      <OurProducts/>
      <Services/>
    </div>
  )
}

export default Home;
