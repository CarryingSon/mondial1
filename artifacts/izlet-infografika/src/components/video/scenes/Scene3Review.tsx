import { motion } from 'framer-motion';
import { FileText, CheckCircle2, User, MapPin } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions, staggerConfigs, itemVariants, containerVariants } from '@/lib/video/animations';

export default function Scene3Review() {
  const [step, setStep] = useState(0);

  useSceneTimer([
    { time: 500, callback: () => setStep(1) },
    { time: 1000, callback: () => setStep(2) },
    { time: 1500, callback: () => setStep(3) },
    { time: 2000, callback: () => setStep(4) },
    { time: 3000, callback: () => setStep(5) },
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-warm.png)` }}
      {...sceneTransitions.fadeBlur}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md" />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-blue-600 h-24 flex items-center px-8 gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <FileText size={24} className="text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-32 h-4 bg-white/30 rounded-full" />
            <div className="w-48 h-3 bg-white/20 rounded-full" />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 flex gap-8">
          
          {/* Left Column - Student & Parents */}
          <div className="flex-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -20 }}
              className="bg-slate-50 p-4 rounded-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                <User size={24} />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-full h-3 bg-slate-200 rounded-full" />
                <div className="w-2/3 h-3 bg-slate-200 rounded-full" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: step >= 2 ? 1 : 0, x: step >= 2 ? 0 : -20 }}
              className="bg-slate-50 p-4 rounded-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-500">
                <User size={24} />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-full h-3 bg-slate-200 rounded-full" />
                <div className="w-3/4 h-3 bg-slate-200 rounded-full" />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Program Details */}
          <div className="flex-1 space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: step >= 3 ? 1 : 0, scale: step >= 3 ? 1 : 0.9 }}
              className="h-full border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center"
            >
              <MapPin size={32} className="text-slate-400 mb-4" />
              <div className="w-24 h-4 bg-slate-200 rounded-full mb-2" />
              <div className="w-16 h-3 bg-slate-100 rounded-full" />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: step >= 4 ? 1 : 0 }}
                transition={{ type: 'spring', bounce: 0.6 }}
                className="mt-6"
              >
                <CheckCircle2 size={40} className="text-emerald-500" />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
