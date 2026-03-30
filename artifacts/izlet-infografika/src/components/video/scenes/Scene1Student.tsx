import { motion } from 'framer-motion';
import { User, FileText, Check, ArrowRight } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { elementAnimations, sceneTransitions, staggerConfigs, containerVariants, itemVariants } from '@/lib/video/animations';

export default function Scene1Student() {
  const [step, setStep] = useState(0);

  useSceneTimer([
    { time: 500, callback: () => setStep(1) },
    { time: 1500, callback: () => setStep(2) },
    { time: 2500, callback: () => setStep(3) },
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-warm.png)` }}
      {...sceneTransitions.fadeBlur}
    >
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

      <div className="relative flex items-center gap-16 z-10">
        {/* Student Avatar */}
        <motion.div
          animate={{
            scale: step >= 2 ? 0.6 : 1,
            opacity: step >= 2 ? 0.3 : 1,
            x: step >= 2 ? -150 : 0
          }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center shadow-md border-4 border-white">
            <User size={40} className="text-slate-400" />
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <div className="w-8 h-3 rounded-full bg-slate-200" />
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          animate={{
            x: step >= 2 ? 50 : 0,
            scale: step >= 2 ? 0.9 : 1,
          }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="relative bg-white p-8 rounded-2xl shadow-xl w-64 border border-slate-100"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-500">
            <FileText size={32} />
          </div>

          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: step >= 1 + i * 0.5 ? 1 : 0 }}
                    className="w-4 h-4 text-emerald-500"
                  >
                    <Check size={16} />
                  </motion.div>
                </div>
                <div className="h-4 bg-slate-100 rounded-full flex-1 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-blue-200"
                    initial={{ width: 0 }}
                    animate={{ width: step >= 1 ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 10 }}
            className="mt-6 w-full h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white"
          >
            <Check size={24} />
          </motion.div>
        </motion.div>
        
        {/* Connection to next scene */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 100, scale: 1.5 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="absolute left-full ml-12 flex items-center"
          >
            <motion.div 
              className="h-2 bg-gradient-to-r from-blue-300 to-amber-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <ArrowRight size={48} className="text-amber-500 -ml-4 z-10" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
