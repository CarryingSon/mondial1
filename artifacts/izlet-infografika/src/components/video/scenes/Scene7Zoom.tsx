import { motion } from 'framer-motion';
import { Video, Users, Mic, MicOff } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene7Zoom() {
  const [step, setStep] = useState(0);

  useSceneTimer([
    { time: 500, callback: () => setStep(1) }, // Show window
    { time: 1000, callback: () => setStep(2) }, // Show participants
    { time: 2000, callback: () => setStep(3) }, // Highlight speaker
  ]);

  const participants = [0, 1, 2, 3];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-slate-100"
      {...sceneTransitions.scaleFade}
    >
      <div className="relative z-10 w-full max-w-4xl">
        
        {/* Browser / App Window */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: step >= 1 ? 0 : 50, opacity: step >= 1 ? 1 : 0 }}
          className="bg-slate-900 rounded-xl shadow-2xl overflow-hidden aspect-video flex flex-col"
        >
          {/* Toolbar */}
          <div className="h-12 bg-slate-800 flex items-center px-4 justify-between border-b border-slate-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-red-600" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-700 rounded-md">
              <Video size={16} className="text-blue-400" />
              <div className="w-24 h-2 bg-slate-600 rounded-full" />
            </div>
            <div className="w-8" />
          </div>

          {/* Video Grid */}
          <div className="flex-1 p-4 grid grid-cols-2 gap-4">
            {participants.map((p) => (
              <motion.div
                key={p}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: step >= 2 ? 1 : 0.8, opacity: step >= 2 ? 1 : 0 }}
                transition={{ delay: p * 0.15 }}
                className={`relative bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center border-2 ${
                  p === 0 && step >= 3 ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
                  p === 0
                    ? 'bg-[#2E3192] text-white'
                    : p === 1
                    ? 'bg-[#E31E24] text-white'
                    : p === 2
                    ? 'bg-[#2E3192]/70 text-white'
                    : 'bg-[#E31E24]/70 text-white'
                }`}>
                  <Users size={32} />
                </div>
                
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-slate-900/60 flex items-center justify-center backdrop-blur-sm">
                    {p === 0 && step >= 3 ? (
                      <Mic size={12} className="text-emerald-400" />
                    ) : (
                      <MicOff size={12} className="text-red-400" />
                    )}
                  </div>
                  <div className="w-16 h-3 bg-slate-900/60 rounded-full backdrop-blur-sm" />
                </div>

                {/* Connected border glow for all tiles when meeting is live */}
                {step >= 3 && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ repeat: Infinity, duration: p === 0 ? 1.5 : 2 + p * 0.3 }}
                    className={`absolute inset-0 rounded-lg pointer-events-none border-4 ${
                      p === 0 ? 'border-[#2E3192]' : 'border-[#E31E24]/60'
                    }`}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom controls */}
          <div className="h-16 bg-slate-800 flex items-center justify-center gap-4">
             <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center"><Mic size={18} className="text-slate-300" /></div>
             <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center"><Video size={18} className="text-slate-300" /></div>
             <div className="w-16 h-8 rounded-full bg-red-500/20" />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
