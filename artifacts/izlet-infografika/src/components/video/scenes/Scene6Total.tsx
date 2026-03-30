import { motion } from 'framer-motion';
import { Package, Plus, Equal, Sparkles } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene6Total() {
  const [step, setStep] = useState(0);

  useSceneTimer([
    { time: 500, callback: () => setStep(1) }, // Base + Addons
    { time: 1500, callback: () => setStep(2) }, // Equal sign
    { time: 2000, callback: () => setStep(3) }, // Merge into final box
    { time: 3000, callback: () => setStep(4) }, // Sparkles
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-blue.png)` }}
      {...sceneTransitions.morphExpand}
    >
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-4xl h-96 flex items-center justify-center">
        
        {/* Left Side: Ingredients */}
        <motion.div 
          animate={{
            x: step >= 3 ? 150 : 0,
            opacity: step >= 3 ? 0 : 1,
            scale: step >= 3 ? 0.5 : 1
          }}
          className="flex items-center gap-6 absolute left-20"
        >
          {/* Base */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -20 }}
            className="w-32 h-40 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center border-t-4 border-blue-500"
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

          {/* Addons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
            className="w-32 h-40 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center border-t-4 border-red-500"
          >
            <div className="w-16 h-4 bg-red-50 rounded-full mb-4" />
            <div className="w-full px-4 space-y-2">
               <div className="h-2 bg-slate-100 rounded-full" />
               <div className="h-2 bg-slate-100 rounded-full w-3/4" />
            </div>
          </motion.div>
        </motion.div>

        {/* Center: Equal */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: step >= 2 ? (step >= 3 ? 0 : 1) : 0,
            opacity: step >= 2 ? (step >= 3 ? 0 : 1) : 0 
          }}
          className="absolute z-20"
        >
          <Equal size={48} className="text-white" />
        </motion.div>

        {/* Right Side: Total */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ 
            opacity: step >= 3 ? 1 : 0, 
            scale: step >= 3 ? 1 : 0.8,
            x: step >= 3 ? 0 : 50,
          }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="absolute z-30"
          style={{ right: step >= 3 ? 'auto' : '100px' }} // Centers when step >=3 via x translation above relative to normal pos, but we'll use a hack to center it.
        >
          <div className="w-64 h-64 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden border-2 border-emerald-400">
            <div className="absolute top-0 inset-x-0 h-2 bg-emerald-400" />
            
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
              <Package size={40} className="text-emerald-500" />
            </div>
            
            <div className="w-32 h-6 bg-emerald-100 rounded-full mb-4" />
            <div className="w-48 h-3 bg-slate-100 rounded-full mb-2" />
            <div className="w-40 h-3 bg-slate-100 rounded-full" />

            {/* Sparkles */}
            {step >= 4 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                className="absolute top-4 right-4 text-emerald-400"
              >
                <Sparkles size={32} />
              </motion.div>
            )}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
