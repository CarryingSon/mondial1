import { motion } from 'framer-motion';
import { Mail, Users } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene2Email() {
  const [step, setStep] = useState(0);

  // Total scene: 5200ms
  // seg 6 (18.05–22.61, ~4.6s): email travels to parents with arc, parents react
  useSceneTimer([
    { time: 500,  callback: () => setStep(1) },  // envelope + parents appear
    { time: 1800, callback: () => setStep(2) },  // envelope arcs forward
    { time: 3200, callback: () => setStep(3) },  // envelope arrives, ping
    { time: 4200, callback: () => setStep(4) },  // reaction bubble pops
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
          initial={{ x: -400, y: 80, scale: 0, opacity: 0 }}
          animate={{
            x: step >= 3 ? 180 : step >= 2 ? 80 : step >= 1 ? 0 : -400,
            y: step >= 3 ? 0 : step >= 2 ? -60 : step >= 1 ? 0 : 80,
            scale: step >= 3 ? 0 : step >= 1 ? 1 : 0,
            opacity: step >= 3 ? 0 : step >= 1 ? 1 : 0,
            rotate: step >= 2 ? 8 : -12,
          }}
          transition={{ duration: 1.3, type: 'spring', bounce: 0.25 }}
          className="absolute left-1/4 z-30"
        >
          {/* Arc trail */}
          {step >= 1 && step < 3 && (
            <motion.div
              className="absolute right-full top-1/2 h-3 bg-gradient-to-r from-transparent to-white/40 rounded-full blur-sm"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ transformOrigin: 'right center', rotate: -8 }}
            />
          )}

          <div className="w-36 h-28 bg-white rounded-xl flex items-center justify-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1/2 bg-slate-100 border-b border-slate-200"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />
            <Mail size={52} className="text-[#2E3192] relative z-10" />
          </div>
        </motion.div>

        {/* Parent Avatars */}
        <motion.div
          initial={{ opacity: 0, x: 120, scale: 0.8 }}
          animate={{
            opacity: step >= 1 ? 1 : 0,
            x: step >= 1 ? 220 : 120,
            scale: step >= 3 ? 1.08 : 1,
          }}
          transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
          className="relative flex flex-col items-center gap-8 z-20"
        >
          {/* Ping ring on arrival */}
          {step >= 3 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-4 border-[#E31E24]"
            />
          )}

          <div className="flex gap-6 relative">
            <div className="w-52 h-52 rounded-full bg-[#2E3192] flex items-center justify-center shadow-[0_0_50px_rgba(46,49,146,0.5)] border-8 border-white z-20 relative">
              <Users size={88} className="text-white" />
            </div>
            <div className="w-44 h-44 rounded-full bg-[#E31E24] flex items-center justify-center shadow-[0_0_50px_rgba(227,30,36,0.5)] border-8 border-white -ml-16 mt-8 z-10 relative">
              <Users size={72} className="text-white" />
            </div>
          </div>

          {/* Reaction bubble */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: step >= 4 ? 1 : 0 }}
            transition={{ type: 'spring', bounce: 0.65, delay: 0.15 }}
            className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center"
          >
            <div className="w-5 h-5 bg-[#E31E24] rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
