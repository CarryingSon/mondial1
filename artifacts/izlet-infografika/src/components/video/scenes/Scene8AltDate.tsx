import { motion } from 'framer-motion';
import { Mail, CalendarDays, RefreshCw, ArrowRight } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene8AltDate() {
  const [step, setStep] = useState(0);

  // Total scene: 4260ms
  // seg 16 (59.86–63.46, ~3.6s): final stage — alternate date option
  useSceneTimer([
    { time: 450,  callback: () => setStep(1) }, // email icon
    { time: 1600, callback: () => setStep(2) }, // processing spinner
    { time: 2900, callback: () => setStep(3) }, // new calendar date appears
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-warm.png)` }}
      {...sceneTransitions.slideLeft}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

      <div className="relative z-10 flex items-center gap-16">

        {/* Email icon */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -30, scale: step >= 2 ? 0.9 : 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-28 h-28 rounded-2xl bg-white shadow-xl flex items-center justify-center border-2 border-slate-100">
            <Mail size={48} className="text-slate-400" />
          </div>
          <div className="w-20 h-3 bg-slate-200 rounded-full" />
        </motion.div>

        {/* Arrow / spinner */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="absolute"
          >
            {step === 2 ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
              >
                <RefreshCw size={36} className="text-[#2E3192]" />
              </motion.div>
            ) : (
              <ArrowRight size={36} className="text-slate-300" />
            )}
          </motion.div>
        </div>

        {/* New Date */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: step >= 3 ? 1 : 0, opacity: step >= 3 ? 1 : 0 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-36 h-36 rounded-2xl bg-emerald-50 shadow-xl flex flex-col items-center justify-center border-2 border-emerald-200 relative overflow-hidden">
            <div className="h-10 bg-emerald-500 w-full absolute top-0" />
            <CalendarDays size={52} className="text-emerald-600 mt-4" />
          </div>
          <div className="w-24 h-4 bg-emerald-200 rounded-full" />
          <div className="w-16 h-3 bg-emerald-100 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}
