import { motion } from 'framer-motion';
import { Mail, CalendarDays, RefreshCw, ArrowRight } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene8AltDate() {
  const [step, setStep] = useState(0);

  useSceneTimer([
    { time: 500, callback: () => setStep(1) }, // Email sent
    { time: 1500, callback: () => setStep(2) }, // Refreshing/processing
    { time: 2500, callback: () => setStep(3) }, // New date appears
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-warm.png)` }}
      {...sceneTransitions.slideLeft}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

      <div className="relative z-10 flex items-center gap-12">
        
        {/* Email send */}
        <motion.div
          animate={{ x: step >= 2 ? -20 : 0 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-24 h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center border-2 border-slate-100">
            <Mail size={40} className="text-slate-400" />
          </div>
          <div className="w-16 h-3 bg-slate-200 rounded-full" />
        </motion.div>

        {/* Processing arrow */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="absolute"
          >
            {step === 2 ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <RefreshCw size={32} className="text-blue-400" />
              </motion.div>
            ) : (
              <ArrowRight size={32} className="text-slate-300" />
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
          <div className="w-32 h-32 rounded-2xl bg-emerald-50 shadow-xl flex flex-col items-center justify-center border-2 border-emerald-200 overflow-hidden">
            <div className="h-8 bg-emerald-500 w-full absolute top-0" />
            <CalendarDays size={48} className="text-emerald-600 mt-4" />
          </div>
          <div className="w-20 h-4 bg-emerald-200 rounded-full" />
          <div className="w-12 h-3 bg-emerald-100 rounded-full" />
        </motion.div>

      </div>
    </motion.div>
  );
}
