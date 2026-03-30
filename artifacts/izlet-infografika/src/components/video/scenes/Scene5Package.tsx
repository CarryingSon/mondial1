import { motion } from 'framer-motion';
import { Bus, Hotel, Map, Plus, Camera, Utensils, Compass, List, Check } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

const BASE_ICONS = [Bus, Hotel, Map];
const ADDON_ICONS = [Camera, Utensils, Compass];

export default function Scene5Package() {
  const [step, setStep] = useState(0);
  // -1 = none; 0–5 = individual item pulse
  const [pulseItem, setPulseItem] = useState(-1);

  // Total scene: 12000ms
  // Line 4 (~4s): "storitve osnovnega aranžmaja" — base card reveals item by item
  // Line 5 (~5s): "dodatne možnosti… celoten pregled" — addons appear, then total view card
  useSceneTimer([
    { time: 500,  callback: () => setStep(1) },   // base card appears
    { time: 1500, callback: () => setStep(2) },   // base item 1
    { time: 2400, callback: () => setStep(3) },   // base item 2
    { time: 3300, callback: () => setStep(4) },   // base item 3  ← end of line 4
    { time: 4300, callback: () => setStep(5) },   // plus symbol (line 5 begins)
    { time: 5200, callback: () => setStep(6) },   // addon card
    { time: 5900, callback: () => setStep(7) },   // addon item 1
    { time: 6600, callback: () => setStep(8) },   // addon item 2
    { time: 7300, callback: () => setStep(9) },   // addon item 3
    // "celoten pregled" — total view card slides up
    { time: 8200, callback: () => setStep(10) },  // total view card appears
    // Individual item pulse wave through all 6 items
    { time: 9200,  callback: () => setPulseItem(0) },
    { time: 9900,  callback: () => setPulseItem(1) },
    { time: 10600, callback: () => setPulseItem(2) },
    { time: 11000, callback: () => setPulseItem(3) },
    { time: 11400, callback: () => setPulseItem(4) },
    { time: 11700, callback: () => setPulseItem(5) },
  ]);

  const baseVisible = (i: number) => step >= 2 + i;
  const addonVisible = (i: number) => step >= 7 + i;
  const inPhase3 = step >= 10;
  const isItemPulsing = (globalIdx: number) => inPhase3 && pulseItem === globalIdx;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-white"
      {...sceneTransitions.slideUp}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#2E3192 1px, transparent 1px), linear-gradient(90deg, #2E3192 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 flex items-start gap-6 px-10 w-full max-w-5xl">

        {/* Base Package Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -50 }}
          transition={{ duration: 0.6 }}
          className="flex-1 bg-white rounded-2xl shadow-lg border-t-4 border-[#2E3192] flex flex-col p-6"
        >
          <div className="w-28 h-5 bg-blue-100 rounded-full mb-5 self-center" />

          <div className="space-y-3">
            {BASE_ICONS.map((Icon, i) => {
              const pulsing = isItemPulsing(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: baseVisible(i) ? 1 : 0, y: baseVisible(i) ? 0 : 16, scale: pulsing ? 1.03 : 1 }}
                  transition={{ duration: 0.4 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors duration-300 ${
                    pulsing ? 'bg-blue-100 shadow' : 'bg-slate-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    pulsing ? 'bg-[#2E3192] text-white' : 'bg-[#2E3192]/10 text-[#2E3192]'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className={`w-full h-2.5 rounded-full transition-colors duration-300 ${pulsing ? 'bg-[#2E3192]/30' : 'bg-slate-200'}`} />
                    <div className={`w-1/2 h-2 rounded-full transition-colors duration-300 ${pulsing ? 'bg-[#2E3192]/15' : 'bg-slate-200'}`} />
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
          className="w-14 h-14 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center shadow-md shrink-0 mt-16"
        >
          <Plus size={28} className="text-[#E31E24]" />
        </motion.div>

        {/* Addons Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: step >= 6 ? 1 : 0, x: step >= 6 ? 0 : 50 }}
          transition={{ duration: 0.6 }}
          className="flex-1 bg-white rounded-2xl shadow-lg border-t-4 border-[#E31E24] flex flex-col p-6"
        >
          <div className="w-28 h-5 bg-red-50 rounded-full mb-5 self-center" />

          <div className="space-y-3">
            {ADDON_ICONS.map((Icon, i) => {
              const globalIdx = 3 + i;
              const pulsing = isItemPulsing(globalIdx);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: addonVisible(i) ? 1 : 0, y: addonVisible(i) ? 0 : 16, scale: pulsing ? 1.03 : 1 }}
                  transition={{ duration: 0.4 }}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-colors duration-300 ${
                    pulsing ? 'border-red-300 bg-red-100 shadow' : 'border-red-100 bg-red-50/30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    pulsing ? 'bg-[#E31E24] text-white' : 'bg-[#E31E24]/10 text-[#E31E24]'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className={`w-full h-2.5 rounded-full transition-colors duration-300 ${pulsing ? 'bg-[#E31E24]/30' : 'bg-red-100/70'}`} />
                    <div className={`w-1/2 h-2 rounded-full transition-colors duration-300 ${pulsing ? 'bg-[#E31E24]/15' : 'bg-red-100/70'}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* "Celoten pregled" — Total view card slides up from bottom */}
      {step >= 10 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
          className="relative z-20 mt-6 w-full max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-emerald-400 overflow-hidden"
        >
          <div className="h-2 bg-gradient-to-r from-[#2E3192] via-emerald-400 to-[#E31E24]" />
          <div className="p-5 flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
              <List size={28} className="text-emerald-600" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="w-40 h-3 bg-emerald-100 rounded-full" />
              <div className="w-56 h-2 bg-slate-100 rounded-full" />
            </div>
            <div className="flex gap-2 shrink-0">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, type: 'spring', bounce: 0.6 }}
                >
                  <Check size={18} className={i < 3 ? 'text-[#2E3192]' : 'text-[#E31E24]'} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
