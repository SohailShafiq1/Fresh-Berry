import React, { useEffect, useState } from "react";
import { HeroSection } from "./Components/HeroSection/HeroSection";
import Cateogirze from "./Components/Cateogirze/Cateogirze";
import OurProducts from "./Components/OurProducts/OurProducts";
import Services from "./Components/Services/Services";
import IntroScreen from "../IntroScreen/IntroScreen";
import { Comitments } from "./Components/Comitments/Comitments";

const Home = () => {
  const [showIntro, setShowIntro] = useState(() => {
    const introData = localStorage.getItem("introShown");
    if (!introData) return true;
    try {
      const { shownAt } = JSON.parse(introData);
      if (Date.now() - shownAt > 3600000) {
        localStorage.removeItem("introShown");
        return true;
      }
      return false;
    } catch {
      localStorage.removeItem("introShown");
      return true;
    }
  });

  useEffect(() => {
    if (!showIntro) {
      localStorage.setItem(
        "introShown",
        JSON.stringify({ shownAt: Date.now() })
      );
    }
  }, [showIntro]);

  return (
    <div>
      {showIntro && <IntroScreen onFinish={() => setShowIntro(false)} />}
      <HeroSection />
      <Cateogirze />
      <OurProducts />
      <Services />
      <Comitments/>
    </div>
  );
};

export default Home;
