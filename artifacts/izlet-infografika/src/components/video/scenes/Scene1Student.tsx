import { motion } from 'framer-motion';
import { User, FileText, Check, ArrowRight } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene1Student() {
  const [step, setStep] = useState(0);

  // Total scene: 8840ms
  // seg 3 (9.26–12.39, ~3.1s): form appears, first fields fill
  // seg 4 (12.78–15.54, ~2.8s): form completes, submit button
  // seg 5 (15.81–17.42, ~1.6s): handoff arrow to parents
  useSceneTimer([
    { time: 500,  callback: () => setStep(1) },  // form appears
    { time: 1800, callback: () => setStep(2) },  // fields start filling
    { time: 3200, callback: () => setStep(3) },  // all fields checked (end of seg 3)
    { time: 4600, callback: () => setStep(4) },  // student shrinks / submit button (seg 4)
    { time: 6200, callback: () => setStep(5) },  // submit button glows
    { time: 7200, callback: () => setStep(6) },  // handoff arrow (seg 5)
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
            scale: step >= 4 ? 0.6 : 1,
            opacity: step >= 4 ? 0.25 : 1,
            x: step >= 4 ? -100 : 0,
          }}
          transition={{ duration: 0.9, ease: 'circOut' }}
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
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: step >= 1 ? 1 : 0,
            y: step >= 1 ? 0 : 30,
            x: step >= 4 ? 40 : 0,
            scale: step >= 4 ? 0.92 : 1,
          }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="relative bg-white p-8 rounded-2xl shadow-xl w-72 border border-slate-100"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-500">
            <FileText size={32} />
          </div>

          <div className="space-y-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: step >= 2 + i ? 1 : 0 }}
                    transition={{ type: 'spring', bounce: 0.6 }}
                    className="text-emerald-500"
                  >
                    <Check size={16} />
                  </motion.div>
                </div>
                <div className="h-4 bg-slate-100 rounded-full flex-1 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#2E3192]/30"
                    initial={{ width: 0 }}
                    animate={{ width: step >= 2 + i ? '100%' : step >= 1 ? '40%' : '0%' }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: step >= 5 ? 1 : step >= 4 ? 0.5 : 0,
              y: step >= 4 ? 0 : 10,
              scale: step >= 5 ? 1.03 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="mt-6 w-full h-12 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-lg"
          >
            <Check size={24} />
          </motion.div>
        </motion.div>

        {/* Handoff arrow → parents (seg 5) */}
        {step >= 6 && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center ml-4"
          >
            <motion.div
              className="h-2 rounded-full"
              style={{ background: 'linear-gradient(90deg, #2E3192, #E31E24)' }}
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
            >
              <ArrowRight size={52} className="text-[#E31E24] -ml-4" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
