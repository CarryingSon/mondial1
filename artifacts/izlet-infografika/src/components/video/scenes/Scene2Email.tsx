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
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-md" />

      <div className="relative z-10 flex items-center gap-24">
        {/* Email Envelope */}
        <motion.div
          animate={{
            x: step >= 2 ? 300 : 0,
            scale: step >= 3 ? 0 : 1,
            opacity: step >= 3 ? 0 : 1,
          }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="relative"
        >
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-32 h-24 bg-white rounded-xl flex items-center justify-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1/2 bg-slate-100 border-b border-slate-200" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
            <Mail size={48} className="text-blue-500 relative z-10" />
          </motion.div>
        </motion.div>

        {/* Parent Avatars */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : 50 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center shadow-xl border-4 border-white z-20">
              <Users size={40} className="text-blue-600" />
            </div>
            <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center shadow-xl border-4 border-white -ml-8 z-10">
              <Users size={40} className="text-amber-600" />
            </div>
          </div>
          
          {/* Reaction bubbles */}
          <div className="flex gap-4 h-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: step >= 3 ? 1 : 0 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
            >
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
