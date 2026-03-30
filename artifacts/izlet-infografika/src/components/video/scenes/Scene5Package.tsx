import { motion } from 'framer-motion';
import { Bus, Hotel, Map, Plus, Camera, Utensils, Compass } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

const BASE_ICONS = [Bus, Hotel, Map];
const ADDON_ICONS = [Camera, Utensils, Compass];

// All 6 items indexed: 0-2 = base, 3-5 = addon
const TOTAL_ITEMS = 6;

export default function Scene5Package() {
  const [step, setStep] = useState(0);
  // -1 = none highlighted; 0-5 = individual item pulse
  const [pulseItem, setPulseItem] = useState(-1);

  // Total scene: 16020ms
  // Phase 1 — seg 10 (33.05–38.74, ~5.7s): base package reveals item by item
  // Phase 2 — seg 11 (39.38–42.60, ~3.2s): plus + addon package slide in
  // Phase 3 — seg 12 (43.49–48.75, ~5.3s): item-by-item pulse wave through all 6 rows
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
    { time: 10200, callback: () => setStep(9) },  // addon item 3 — phase 3 begins
    // Phase 3: pulse each individual item sequentially, two full passes through all 6
    { time: 10800, callback: () => setPulseItem(0) },  // base-1
    { time: 11500, callback: () => setPulseItem(1) },  // base-2
    { time: 12200, callback: () => setPulseItem(2) },  // base-3
    { time: 12900, callback: () => setPulseItem(3) },  // addon-1
    { time: 13600, callback: () => setPulseItem(4) },  // addon-2
    { time: 14300, callback: () => setPulseItem(5) },  // addon-3
    { time: 15000, callback: () => setPulseItem(-1) }, // clear
  ]);

  const baseVisible = (i: number) => step >= 2 + i;
  const addonVisible = (i: number) => step >= 7 + i;
  const inPhase3 = step >= 9;

  // Is this item currently being pulsed?
  const isItemPulsing = (globalIdx: number) => inPhase3 && pulseItem === globalIdx;

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
          className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-4 border-[#2E3192] flex flex-col items-center"
        >
          <div className="w-32 h-6 bg-blue-100 rounded-full mb-8" />

          <div className="grid grid-cols-1 gap-4 w-full">
            {BASE_ICONS.map((Icon, i) => {
              const pulsing = isItemPulsing(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: baseVisible(i) ? 1 : 0,
                    y: baseVisible(i) ? 0 : 20,
                    scale: pulsing ? 1.04 : 1,
                  }}
                  transition={{ duration: 0.35 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-colors duration-300 ${
                    pulsing ? 'bg-blue-100 shadow-md' : 'bg-slate-50'
                  }`}
                >
                  <motion.div
                    animate={{ scale: pulsing ? 1.15 : 1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      pulsing ? 'bg-[#2E3192] text-white' : 'bg-[#2E3192]/10 text-[#2E3192]'
                    }`}
                  >
                    <Icon size={24} />
                  </motion.div>
                  <div className="flex-1 space-y-2">
                    <div className={`w-full h-3 rounded-full transition-colors duration-300 ${pulsing ? 'bg-[#2E3192]/30' : 'bg-slate-200'}`} />
                    <div className={`w-1/2 h-2 rounded-full transition-colors duration-300 ${pulsing ? 'bg-[#2E3192]/20' : 'bg-slate-200'}`} />
                  </div>
                </motion.div>
              );
            })}
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
          className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-4 border-[#E31E24] flex flex-col items-center"
        >
          <div className="w-32 h-6 bg-red-50 rounded-full mb-8" />

          <div className="grid grid-cols-1 gap-4 w-full">
            {ADDON_ICONS.map((Icon, i) => {
              const globalIdx = 3 + i;
              const pulsing = isItemPulsing(globalIdx);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: addonVisible(i) ? 1 : 0,
                    y: addonVisible(i) ? 0 : 20,
                    scale: pulsing ? 1.04 : 1,
                  }}
                  transition={{ duration: 0.35 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-colors duration-300 ${
                    pulsing ? 'border-red-300 bg-red-100 shadow-md' : 'border-red-100 bg-red-50/30'
                  }`}
                >
                  <motion.div
                    animate={{ scale: pulsing ? 1.15 : 1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      pulsing ? 'bg-[#E31E24] text-white' : 'bg-[#E31E24]/10 text-[#E31E24]'
                    }`}
                  >
                    <Icon size={24} />
                  </motion.div>
                  <div className="flex-1 space-y-2">
                    <div className={`w-full h-3 rounded-full transition-colors duration-300 ${pulsing ? 'bg-[#E31E24]/30' : 'bg-red-100/70'}`} />
                    <div className={`w-1/2 h-2 rounded-full transition-colors duration-300 ${pulsing ? 'bg-[#E31E24]/20' : 'bg-red-100/70'}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
