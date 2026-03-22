import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = ['機関', '文化', '音楽', '運動'];

const CIRCLES_DATA = {
  '機関': [
    { name: '学生委員会', desc: '学生生活向上のための企画・運営' },
    { name: '理大祭実行委員会', desc: '年に一度の学園祭を創り上げる' },
    { name: '新聞会', desc: '学内外のニュースを取材・報道' },
  ],
  '文化': [
    { name: '写真部', desc: '日常の瞬間を切り取る' },
    { name: '美術部', desc: '自由な表現を追求する' },
    { name: '茶道部', desc: '伝統的なおもてなしの心' },
    { name: '天文研究部', desc: '星空の観測と研究' },
  ],
  '音楽': [
    { name: '軽音楽部', desc: 'バンド活動・ライブ開催' },
    { name: '管弦楽団', desc: 'クラシック音楽の合奏' },
    { name: '合唱団', desc: '声を合わせたハーモニー' },
  ],
  '運動': [
    { name: '硬式野球部', desc: 'リーグ戦での勝利を目指す' },
    { name: 'サッカー部', desc: 'チームプレイと技術の向上' },
    { name: '陸上競技部', desc: '自己ベストへの挑戦' },
    { name: '剣道部', desc: '心身の鍛錬と礼儀' },
  ],
};

export const Circles: React.FC = () => {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

  return (
    <section id="circles" className="py-24 md:py-32 bg-zinc-50 text-zinc-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-[Noto_Serif_JP] tracking-widest mb-4"
            >
              Circles
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500 font-['Noto_Serif_JP'] tracking-wider text-sm md:text-base"
            >
              サークル・団体紹介
            </motion.p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 border-b border-zinc-200 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative pb-4 text-lg font-[Noto_Serif_JP] tracking-widest whitespace-nowrap transition-colors duration-300 ${
                activeTab === cat ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              {cat}
              {activeTab === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900"
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
              {CIRCLES_DATA[activeTab as keyof typeof CIRCLES_DATA].map((circle, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-[4/3] bg-zinc-200 overflow-hidden mb-6 relative">
                    {/* Placeholder for real images */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/10">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <ArrowUpRight size={20} className="text-zinc-900" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-[Noto_Serif_JP] tracking-wider mb-2">{circle.name}</h3>
                  <p className="text-zinc-500 text-sm font-['Noto_Sans_JP'] tracking-wide">{circle.desc}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
