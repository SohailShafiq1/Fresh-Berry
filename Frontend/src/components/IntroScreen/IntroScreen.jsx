// components/IntroScreen.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/intrologo.png"; // Adjust the path as necessary
import "./IntroScreen.css";

const sections = [0, 1, 2, 3, 4];

const IntroScreen = ({ onFinish }) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
      setTimeout(onFinish, 1500); // trigger next screen
    }, 1500); // wait before starting
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!startAnimation && (
        <motion.div
          className="intro-wrapper"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="logo">
            <img src={logo} alt="Fresh Berry" />
          </div>
        </motion.div>
      )}

      {startAnimation &&
        sections.map((index) => (
          <motion.div
            key={index}
            className="panel"
            initial={{ y: 0 }}
            animate={{ y: "-100vh" }}
            transition={{ delay: index * 0.1, duration: 1 }}
          />
        ))}
    </AnimatePresence>
  );
};

export default IntroScreen;
