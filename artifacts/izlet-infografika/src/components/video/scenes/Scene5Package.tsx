import { motion } from 'framer-motion';
import { Bus, Hotel, Map, Plus, Camera, Utensils, Compass } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

const BASE_ICONS = [Bus, Hotel, Map];
const ADDON_ICONS = [Camera, Utensils, Compass];

export default function Scene5Package() {
  const [step, setStep] = useState(0);
  const [highlightIdx, setHighlightIdx] = useState(0);

  // Total scene: 16020ms
  // Phase 1 — seg 10 (33.05–38.74, ~5.7s): base package reveals item by item
  // Phase 2 — seg 11 (39.38–42.60, ~3.2s): plus + addon package slide in
  // Phase 3 — seg 12 (43.49–48.75, ~5.3s): all visible, pulsing cycle
  useSceneTimer([
    { time: 600,  callback: () => setStep(1) },   // base card appears
    { time: 1800, callback: () => setStep(2) },   // base item 1
    { time: 3000, callback: () => setStep(3) },   // base item 2
    { time: 4400, callback: () => setStep(4) },   // base item 3
    // Phase 2 starts ~6s
    { time: 6200, callback: () => setStep(5) },   // plus symbol
    { time: 7400, callback: () => setStep(6) },   // addon card
    { time: 8400, callback: () => setStep(7) },   // addon item 1
    { time: 9400, callback: () => setStep(8) },   // addon item 2
    // Phase 3 starts ~10s
    { time: 10200, callback: () => setStep(9) },  // addon item 3 + highlight cycle begins
    { time: 11400, callback: () => setHighlightIdx(1) },
    { time: 12600, callback: () => setHighlightIdx(2) },
    { time: 13800, callback: () => setHighlightIdx(0) },
    { time: 15000, callback: () => setHighlightIdx(1) },
  ]);

  const baseVisible = (i: number) => step >= 2 + i;
  const addonVisible = (i: number) => step >= 7 + i;
  const inPhase3 = step >= 9;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-warm.png)` }}
      {...sceneTransitions.slideUp}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />

      <div className="relative z-10 flex items-center gap-8 px-12 w-full max-w-5xl">

        {/* Base Package Card */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -60 }}
          transition={{ duration: 0.6 }}
          className={`flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-4 border-[#2E3192] flex flex-col items-center transition-shadow duration-500 ${
            inPhase3 && highlightIdx === 0 ? 'shadow-[0_0_30px_rgba(46,49,146,0.25)]' : ''
          }`}
        >
          <div className="w-32 h-6 bg-blue-100 rounded-full mb-8" />

          <div className="grid grid-cols-1 gap-4 w-full">
            {BASE_ICONS.map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: baseVisible(i) ? 1 : 0, y: baseVisible(i) ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors duration-400 ${
                  inPhase3 && highlightIdx === 0 ? 'bg-blue-50' : 'bg-slate-50'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#2E3192]/10 flex items-center justify-center text-[#2E3192]">
                  <Icon size={24} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="w-full h-3 bg-slate-200 rounded-full" />
                  <div className="w-1/2 h-2 bg-slate-200 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Plus Symbol */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: step >= 5 ? 1 : 0, opacity: step >= 5 ? 1 : 0 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center shadow-lg z-20 shrink-0"
        >
          <Plus size={32} className="text-[#E31E24]" />
        </motion.div>

        {/* Addons Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: step >= 6 ? 1 : 0, x: step >= 6 ? 0 : 60 }}
          transition={{ duration: 0.6 }}
          className={`flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-4 border-[#E31E24] flex flex-col items-center transition-shadow duration-500 ${
            inPhase3 && highlightIdx === 1 ? 'shadow-[0_0_30px_rgba(227,30,36,0.25)]' : ''
          }`}
        >
          <div className="w-32 h-6 bg-red-50 rounded-full mb-8" />

          <div className="grid grid-cols-1 gap-4 w-full">
            {ADDON_ICONS.map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: addonVisible(i) ? 1 : 0, y: addonVisible(i) ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors duration-400 ${
                  inPhase3 && highlightIdx === 1 ? 'border-red-200 bg-red-50' : 'border-red-100 bg-red-50/30'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#E31E24]/10 flex items-center justify-center text-[#E31E24]">
                  <Icon size={24} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="w-full h-3 bg-red-100/70 rounded-full" />
                  <div className="w-1/2 h-2 bg-red-100/70 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
