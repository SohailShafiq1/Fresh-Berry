import React from 'react'
import { HeroSection } from './Components/HeroSection/HeroSection';
import Cateogirze from './Components/Cateogirze/Cateogirze';
import OurProducts from './Components/OurProducts/OurProducts';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <Cateogirze/>
      <OurProducts/>
    </div>
  )
}

export default Home;
