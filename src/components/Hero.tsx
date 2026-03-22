import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const IMAGES = [
  "/campus1.jpg",
  "/campus2.jpg",
  "/campus3.jpg",
  "/campus4.jpg",
  "/campus5.jpg",
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Images */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={IMAGES[currentIndex]}
            alt="Campus"
            className="w-full h-full object-cover object-center opacity-60"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-900/40 pointer-events-none" />

      {/* Text Content */}
      <div className="absolute inset-0 container mx-auto px-6 md:px-12 flex items-center justify-start pointer-events-none">
        <div className="flex gap-4 md:gap-8 writing-vertical-rl text-white font-[Noto_Serif_JP]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl leading-loose tracking-[0.3em] font-light shadow-sm"
          >
            日々の学生生活を、
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl leading-loose tracking-[0.3em] font-light shadow-sm mt-12 md:mt-24"
          >
            より豊かに。
          </motion.h1>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 right-10 flex flex-col items-center gap-4 text-white/70"
      >
        <span className="text-xs font-['Noto_Serif_JP'] tracking-widest writing-vertical-rl">
          Scroll Down
        </span>
        <motion.div
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-white/50 relative overflow-hidden"
        >
          <div className="absolute top-0 w-full h-full bg-white" />
        </motion.div>
      </motion.div>
    </section>
  );
};
