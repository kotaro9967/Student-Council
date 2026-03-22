import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

// ⭕️ PC環境（GitHub Pages）での画像パスを修正
const IMAGES = [
  "/Student-Council/campus1.jpg",
  "/Student-Council/campus2.jpg",
  "/Student-Council/campus3.jpg",
  "/Student-Council/campus4.jpg",
  "/Student-Council/campus5.jpg",
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // ⭕️ GSAPアニメーション（フェードイン・スライドイン）
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // テキストのアニメーション
      gsap.from(".hero-title-1", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        delay: 0.5,
        ease: "power3.out",
      });
      gsap.from(".hero-title-2", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        delay: 1, // 少し遅らせる
        ease: "power3.out",
      });

      // スクロールインジケーターのアニメーション
      gsap.from(scrollRef.current, {
        opacity: 0,
        duration: 1,
        delay: 2.5,
        ease: "power2.inOut",
      });
      gsap.to(".scroll-line-inner", {
        height: "100%",
        top: "100%",
        duration: 2,
        repeat: -1,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert(); // クリーンアップ
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background Images */}
      {IMAGES.map((img, index) => (
        <img
          key={img}
          src={img}
          alt={`Campus ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-2000 ease-in-out ${index === currentIndex ? "opacity-60" : "opacity-0"}`}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-900/40 pointer-events-none" />

      {/* Text Content */}
      <div
        ref={textRef}
        className="absolute inset-0 container mx-auto px-6 md:px-12 flex items-center justify-center md:justify-start pointer-events-none"
      >
        {/* ⭕️ モバイルでは横書き・中央揃え、PCでは縦書き・左揃えに修正 */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 writing-horizontal-tb md:writing-vertical-rl text-white font-[Noto_Serif_JP] text-center md:text-left">
          <h1 className="hero-title-1 text-3xl md:text-6xl lg:text-7xl leading-loose tracking-[0.3em] font-light shadow-sm">
            日々の学生生活を、
          </h1>
          <h1 className="hero-title-2 text-3xl md:text-6xl lg:text-7xl leading-loose tracking-[0.3em] font-light shadow-sm mt-4 md:mt-12 md:mt-24">
            より豊かに。
          </h1>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 right-10 flex flex-col items-center gap-4 text-white/70"
      >
        <span className="text-xs font-['Noto_Serif_JP'] tracking-widest writing-vertical-rl">
          Scroll Down
        </span>
        <div className="w-[1px] h-16 bg-white/50 relative overflow-hidden">
          <div className="scroll-line-inner absolute top-0 w-full h-0 bg-white" />
        </div>
      </div>
    </section>
  );
};
