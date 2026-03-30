import { motion } from 'framer-motion';
import { Bus, Hotel, Map, Plus, Camera, Utensils, Compass } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene5Package() {
  const [step, setStep] = useState(0);

  useSceneTimer([
    { time: 500, callback: () => setStep(1) }, // Show base package
    { time: 1500, callback: () => setStep(2) }, // Show plus
    { time: 2000, callback: () => setStep(3) }, // Show addons
  ]);

  const baseIcons = [Bus, Hotel, Map];
  const addonIcons = [Camera, Utensils, Compass];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-warm.png)` }}
      {...sceneTransitions.slideUp}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />

      <div className="relative z-10 flex items-center gap-8 px-12 w-full max-w-5xl">
        
        {/* Base Package */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -50 }}
          className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-4 border-blue-500 flex flex-col items-center"
        >
          <div className="w-32 h-6 bg-blue-100 rounded-full mb-8" />
          
          <div className="grid grid-cols-1 gap-4 w-full">
            {baseIcons.map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Icon size={24} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="w-full h-3 bg-slate-200 rounded-full" />
                  <div className="w-1/2 h-2 bg-slate-200 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Plus Symbol */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: step >= 2 ? 1 : 0, opacity: step >= 2 ? 1 : 0 }}
          className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center shadow-lg z-20 shrink-0"
        >
          <Plus size={32} className="text-amber-500" />
        </motion.div>

        {/* Addons */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : 50 }}
          className="flex-1 bg-white p-8 rounded-3xl shadow-xl border-t-4 border-amber-400 flex flex-col items-center"
        >
          <div className="w-32 h-6 bg-amber-100 rounded-full mb-8" />
          
          <div className="grid grid-cols-1 gap-4 w-full">
            {addonIcons.map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
                transition={{ delay: 0.2 + i * 0.2 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-amber-100 bg-amber-50/30"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Icon size={24} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="w-full h-3 bg-amber-200/50 rounded-full" />
                  <div className="w-1/2 h-2 bg-amber-200/50 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
