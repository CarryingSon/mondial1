import { motion } from 'framer-motion';
import { Mail, CalendarDays, RefreshCw, ArrowRight, Check } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene8AltDate() {
  const [step, setStep] = useState(0);

  // Total scene: 5500ms
  // "Če komu ponujen termin ne ustreza, se lahko dogovori tudi za drug termin." (~5s)
  // — email arrives → spinner (processing) → new calendar date pops in → confirmed glow
  useSceneTimer([
    { time: 450,  callback: () => setStep(1) },  // email icon appears
    { time: 1600, callback: () => setStep(2) },  // spinner (processing alternate date)
    { time: 2900, callback: () => setStep(3) },  // new calendar date pops in
    { time: 4000, callback: () => setStep(4) },  // calendar glows / confirmed
    { time: 5000, callback: () => setStep(5) },  // checkmark appears on calendar
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-warm.png)` }}
      {...sceneTransitions.slideLeft}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

      <div className="relative z-10 flex items-center gap-16">

        {/* Email icon — original appointment */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: step >= 1 ? 1 : 0,
            x: step >= 1 ? 0 : -30,
            scale: step >= 2 ? 0.88 : 1,
          }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-28 h-28 rounded-2xl bg-white shadow-xl flex items-center justify-center border-2 border-slate-100">
            <Mail size={48} className="text-slate-400" />
          </div>
          <div className="w-20 h-3 bg-slate-200 rounded-full" />
          {/* "not available" cross */}
          {step >= 2 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"
            >
              <div className="w-4 h-0.5 bg-red-400 rounded-full rotate-45 absolute" />
              <div className="w-4 h-0.5 bg-red-400 rounded-full -rotate-45 absolute" />
            </motion.div>
          )}
        </motion.div>

        {/* Arrow / spinner transition */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="absolute"
          >
            {step === 2 ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              >
                <RefreshCw size={40} className="text-[#2E3192]" />
              </motion.div>
            ) : (
              <ArrowRight size={40} className={step >= 3 ? 'text-emerald-500' : 'text-slate-300'} />
            )}
          </motion.div>
        </div>

        {/* New alternate date */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: step >= 3 ? 1 : 0, opacity: step >= 3 ? 1 : 0 }}
          transition={{ type: 'spring', bounce: 0.45 }}
          className="flex flex-col items-center gap-4 relative"
        >
          <motion.div
            animate={step >= 4 ? {
              boxShadow: ['0 0 0px rgba(16,185,129,0)', '0 0 40px rgba(16,185,129,0.45)', '0 0 20px rgba(16,185,129,0.3)'],
              borderColor: ['#d1fae5', '#34d399', '#10b981'],
            } : {}}
            transition={{ duration: 0.8 }}
            className="w-40 h-40 rounded-2xl bg-emerald-50 shadow-xl flex flex-col items-center justify-center border-2 border-emerald-200 relative overflow-hidden"
          >
            <div className="h-10 bg-emerald-500 w-full absolute top-0 flex items-center justify-center">
              <div className="w-16 h-2 bg-white/40 rounded-full" />
            </div>
            <CalendarDays size={56} className="text-emerald-600 mt-4" />

            {/* Checkmark overlay */}
            {step >= 5 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.6 }}
                className="absolute bottom-3 right-3 w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Check size={18} className="text-white" />
              </motion.div>
            )}
          </motion.div>

          <div className="w-28 h-4 bg-emerald-200 rounded-full" />
          <div className="w-20 h-3 bg-emerald-100 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}
