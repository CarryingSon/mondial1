import { motion } from 'framer-motion';
import { Mail, Users, ArrowRight } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene2Email() {
  const [step, setStep] = useState(0);

  useSceneTimer([
    { time: 500, callback: () => setStep(1) },
    { time: 1500, callback: () => setStep(2) },
    { time: 2500, callback: () => setStep(3) },
    { time: 3500, callback: () => setStep(4) },
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-blue.png)` }}
      {...sceneTransitions.slideLeft}
    >
      <div className="absolute inset-0 bg-[#2E3192]/80 backdrop-blur-md" />

      <div className="relative z-10 flex items-center justify-center w-full max-w-5xl mx-auto">
        {/* Email Envelope */}
        <motion.div
          initial={{ x: -400, y: 100, scale: 0, opacity: 0 }}
          animate={{
            x: step >= 3 ? 200 : step >= 2 ? 100 : step >= 1 ? 0 : -400,
            y: step >= 3 ? 0 : step >= 2 ? -50 : step >= 1 ? 0 : 100,
            scale: step >= 3 ? 0 : step >= 1 ? 1 : 0,
            opacity: step >= 3 ? 0 : step >= 1 ? 1 : 0,
            rotate: step >= 2 ? 10 : -15,
          }}
          transition={{ duration: 1.2, type: 'spring', bounce: 0.3 }}
          className="absolute left-1/4 z-30"
        >
          {/* Arc Trail */}
          {step >= 1 && step < 3 && (
            <motion.div 
              className="absolute right-full top-1/2 h-4 bg-gradient-to-r from-transparent to-white/40 rounded-full blur-sm"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{ transformOrigin: 'right center', rotate: -10 }}
            />
          )}
          
          <div className="w-32 h-24 bg-white rounded-xl flex items-center justify-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1/2 bg-slate-100 border-b border-slate-200" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
            <Mail size={48} className="text-[#2E3192] relative z-10" />
          </div>
        </motion.div>

        {/* Parent Avatars */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 200 : 100, scale: step >= 3 ? 1.1 : 1 }}
          transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
          className="relative flex flex-col items-center gap-8 z-20"
        >
          {/* Ping Ring */}
          {step >= 3 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-4 border-[#E31E24]"
            />
          )}

          <div className="flex gap-6 relative">
            {/* Parent 1 (Navy) */}
            <div className="w-48 h-48 rounded-full bg-[#2E3192] flex items-center justify-center shadow-[0_0_40px_rgba(46,49,146,0.5)] border-8 border-[#FDFBF7] z-20 relative">
              <Users size={80} className="text-white" />
            </div>
            
            {/* Parent 2 (Amber) */}
            <div className="w-40 h-40 rounded-full bg-[#E31E24] flex items-center justify-center shadow-[0_0_40px_rgba(227,30,36,0.5)] border-8 border-[#FDFBF7] -ml-16 mt-8 z-10 relative">
              <Users size={64} className="text-white" />
            </div>
          </div>
          
          {/* Reaction bubbles */}
          <div className="flex gap-4 h-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: step >= 3 ? 1 : 0 }}
              transition={{ type: 'spring', bounce: 0.6, delay: 0.2 }}
              className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-[#E31E24] rounded-full" />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
