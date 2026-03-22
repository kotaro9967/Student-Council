import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-4">
          {/* ⭕️ src を直接 "/logo.png" に変更 */}
          <img
            src="/logo.png"
            alt="学友会ロゴ"
            className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
          />
          <div className="flex flex-col">
            <span className="text-white text-lg md:text-xl font-[Noto_Serif_JP] tracking-widest font-light">
              東京理科大学 学友会
            </span>
            <span className="text-zinc-400 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1">
              Student Council of TUS
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          <ul className="flex space-x-8 text-white/80 font-['Noto_Sans_JP'] text-sm tracking-wider">
            {["Service", "Circles", "News", "About"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-white transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#join"
            className="px-6 py-3 rounded-full border border-white/30 text-white font-[Noto_Serif_JP] text-sm tracking-widest hover:bg-white hover:text-zinc-900 transition-all duration-500 flex items-center gap-2"
          >
            学友会入会フォーム
            <span className="w-4 h-[1px] bg-current inline-block"></span>
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-md border-t border-white/10 flex flex-col items-center py-10 space-y-8 lg:hidden"
          >
            <ul className="flex flex-col space-y-6 text-white text-center font-[Noto_Serif_JP] text-lg tracking-widest">
              {["Service", "Circles", "News", "About"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-zinc-400 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#join"
              className="px-8 py-4 rounded-full border border-white text-white font-[Noto_Serif_JP] tracking-widest hover:bg-white hover:text-zinc-900 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              学友会入会フォーム
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
