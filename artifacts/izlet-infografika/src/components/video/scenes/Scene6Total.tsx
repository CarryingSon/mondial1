import { motion } from 'framer-motion';
import { Package, Plus, Equal, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene6Total() {
  const [step, setStep] = useState(0);

  // Total scene: 5080ms
  // seg 17 (64.17–68.54, ~4.4s): recap overview — base + addons → total
  useSceneTimer([
    { time: 500,  callback: () => setStep(1) }, // base + addons appear
    { time: 1600, callback: () => setStep(2) }, // equal sign
    { time: 2600, callback: () => setStep(3) }, // total card
    { time: 3600, callback: () => setStep(4) }, // sparkles
    { time: 4400, callback: () => setStep(5) }, // summary items appear inside total
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-blue.png)` }}
      {...sceneTransitions.morphExpand}
    >
      <div className="absolute inset-0 bg-[#2E3192]/65 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-4xl h-96 flex items-center justify-center">

        {/* Left — Ingredients */}
        <motion.div
          animate={{
            x: step >= 3 ? 140 : 0,
            opacity: step >= 3 ? 0 : 1,
            scale: step >= 3 ? 0.5 : 1,
          }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-6 absolute left-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -20 }}
            className="w-32 h-40 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center border-t-4 border-[#2E3192]"
          >
            <div className="w-16 h-4 bg-blue-100 rounded-full mb-4" />
            <div className="w-full px-4 space-y-2">
              <div className="h-2 bg-slate-100 rounded-full" />
              <div className="h-2 bg-slate-100 rounded-full" />
              <div className="h-2 bg-slate-100 rounded-full w-2/3" />
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: step >= 1 ? 1 : 0 }}
          >
            <Plus size={32} className="text-white/50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
            className="w-32 h-40 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center border-t-4 border-[#E31E24]"
          >
            <div className="w-16 h-4 bg-red-50 rounded-full mb-4" />
            <div className="w-full px-4 space-y-2">
              <div className="h-2 bg-slate-100 rounded-full" />
              <div className="h-2 bg-slate-100 rounded-full w-3/4" />
            </div>
          </motion.div>
        </motion.div>

        {/* Center — Equal */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: step >= 2 ? (step >= 3 ? 0 : 1) : 0,
            opacity: step >= 2 ? (step >= 3 ? 0 : 1) : 0,
          }}
          className="absolute z-20"
        >
          <Equal size={52} className="text-white" />
        </motion.div>

        {/* Right — Total Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: step >= 3 ? 1 : 0,
            scale: step >= 3 ? 1 : 0.8,
          }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="absolute z-30"
        >
          <div className="w-72 h-72 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden border-2 border-emerald-400">
            <div className="absolute top-0 inset-x-0 h-2 bg-emerald-400" />

            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
              <Package size={40} className="text-emerald-500" />
            </div>

            <div className="w-32 h-5 bg-emerald-100 rounded-full mb-3" />
            <div className="w-48 h-3 bg-slate-100 rounded-full mb-2" />
            <div className="w-40 h-3 bg-slate-100 rounded-full" />

            {/* Summary items — step 5 */}
            {step >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 flex gap-3"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.12, type: 'spring', bounce: 0.5 }}
                  >
                    <CheckCircle2 size={22} className="text-emerald-500" />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Sparkles */}
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                className="absolute top-4 right-4 text-emerald-400"
              >
                <Sparkles size={28} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
