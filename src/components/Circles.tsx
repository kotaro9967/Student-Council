import React, { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

const CATEGORIES = ["機関", "文化", "音楽", "運動"];

const CIRCLES_DATA = {
  機関: [
    { name: "学生委員会", desc: "学生生活向上のための企画・運営" },
    { name: "理大祭実行委員会", desc: "年に一度の学園祭を創り上げる" },
    { name: "新聞会", desc: "学内外のニュースを取材・報道" },
  ],
  文化: [
    { name: "写真部", desc: "日常の瞬間を切り取る" },
    { name: "美術部", desc: "自由な表現を追求する" },
    { name: "茶道部", desc: "伝統的なおもてなしの心" },
    { name: "天文研究部", desc: "星空の観測と研究" },
  ],
  音楽: [
    { name: "軽音楽部", desc: "バンド活動・ライブ開催" },
    { name: "管弦楽団", desc: "クラシック音楽の合奏" },
    { name: "合唱団", desc: "声を合わせたハーモニー" },
  ],
  運動: [
    { name: "硬式野球部", desc: "リーグ戦での勝利を目指す" },
    { name: "サッカー部", desc: "チームプレイと技術の向上" },
    { name: "陸上競技部", desc: "自己ベストへの挑戦" },
    { name: "剣道部", desc: "心身の鍛錬と礼儀" },
  ],
};

export const Circles: React.FC = () => {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const tabsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(tabsRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="circles"
      ref={sectionRef}
      className="py-24 md:py-32 relative bg-zinc-950 text-white overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756defefe?auto=format&fit=crop&q=80"
          alt="Circles Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-zinc-950" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div
          ref={titleRef}
          className="flex flex-col items-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-[Noto_Serif_JP] tracking-widest mb-4">
            Circles
          </h2>
          <p className="text-zinc-400 font-['Noto_Serif_JP'] tracking-wider text-sm md:text-base">
            サークル・団体紹介
          </p>
        </div>

        <div ref={tabsRef}>
          {/* Tabs */}
          <div className="flex justify-center space-x-4 border-b border-white/20 mb-12 overflow-x-auto pb-4 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative pb-4 text-base md:text-lg font-[Noto_Serif_JP] tracking-widest whitespace-nowrap transition-colors duration-300 ${
                  activeTab === cat
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {cat}
                {activeTab === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
              >
                {CIRCLES_DATA[activeTab as keyof typeof CIRCLES_DATA].map(
                  (circle, idx) => (
                    <div
                      key={idx}
                      className="group cursor-pointer p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <h3 className="text-xl font-[Noto_Serif_JP] tracking-wider mb-2 text-white">
                        {circle.name}
                      </h3>
                      <p className="text-zinc-400 text-sm font-['Noto_Sans_JP'] tracking-wide">
                        {circle.desc}
                      </p>
                    </div>
                  ),
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
