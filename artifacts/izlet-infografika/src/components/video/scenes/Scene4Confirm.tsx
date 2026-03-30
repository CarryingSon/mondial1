import { motion } from 'framer-motion';
import { Check, MousePointer2, ShieldCheck } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene4Confirm() {
  const [step, setStep] = useState(0);

  useSceneTimer([
    { time: 500, callback: () => setStep(1) }, // Cursor moves
    { time: 1500, callback: () => setStep(2) }, // Click / Button active
    { time: 2000, callback: () => setStep(3) }, // Success state
    { time: 3000, callback: () => setStep(4) }, // Big checkmark
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-slate-50"
      {...sceneTransitions.zoomThrough}
    >
      {/* Background graphic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <ShieldCheck size={400} />
      </div>

      <div className="relative flex flex-col items-center gap-12 z-10">
        {/* The Button */}
        <motion.div
          animate={{
            scale: step >= 3 ? 1.1 : 1,
            backgroundColor: step >= 3 ? '#10B981' : step >= 2 ? '#059669' : '#3B82F6',
          }}
          transition={{ duration: 0.3 }}
          className="relative px-12 py-6 rounded-2xl shadow-xl flex items-center gap-4 text-white overflow-hidden"
        >
          {/* Button content */}
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            {step >= 3 ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <Check size={16} className="text-white" />
              </motion.div>
            ) : (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
          <div className="w-32 h-4 bg-white/40 rounded-full" />
          
          {/* Ripple effect on click */}
          {step === 2 && (
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-white/30 rounded-full"
            />
          )}
        </motion.div>

        {/* The Cursor */}
        <motion.div
          initial={{ x: 100, y: 100, opacity: 0 }}
          animate={{ 
            x: step >= 1 ? 0 : 100, 
            y: step >= 1 ? 20 : 100,
            opacity: step >= 3 ? 0 : 1,
            scale: step === 2 ? 0.9 : 1
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute text-slate-800"
          style={{ zIndex: 50 }}
        >
          <MousePointer2 size={32} className="fill-white" />
        </motion.div>

        {/* Success Explosion */}
        {step >= 4 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-100 rounded-full flex items-center justify-center -z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-48 h-48 bg-emerald-200 rounded-full flex items-center justify-center"
            >
              <Check size={80} className="text-emerald-600" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
