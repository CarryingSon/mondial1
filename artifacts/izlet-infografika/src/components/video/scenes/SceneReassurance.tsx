import { motion } from 'framer-motion';
import { ShieldCheck, Users, Star } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function SceneReassurance() {
  const [step, setStep] = useState(0);

  // Total scene: 7010ms
  // seg 14 (52.88–55.94, ~3.1s): confirmation moment — shield + checkmark
  // seg 15 (56.25–59.20, ~3.0s): reassurance — parents glow, calm
  useSceneTimer([
    { time: 400,  callback: () => setStep(1) }, // shield appears
    { time: 1400, callback: () => setStep(2) }, // outer ring pulses
    { time: 2600, callback: () => setStep(3) }, // shield fully glows
    { time: 3500, callback: () => setStep(4) }, // seg15: parents appear
    { time: 4600, callback: () => setStep(5) }, // stars / calm indicators appear
    { time: 5800, callback: () => setStep(6) }, // final slow pulse
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)' }}
      {...sceneTransitions.zoomThrough}
    >
      {/* Radial glow background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: step >= 2 ? 0.4 : 0, scale: step >= 2 ? 1.2 : 0.6 }}
        transition={{ duration: 1.2 }}
        className="absolute w-[700px] h-[700px] rounded-full bg-emerald-200 blur-3xl"
      />

      <div className="relative z-10 flex flex-col items-center gap-12">

        {/* Shield with checkmark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: step >= 1 ? 1 : 0, opacity: step >= 1 ? 1 : 0 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="relative"
        >
          {/* Outer pulse ring */}
          {step >= 2 && (
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-4 border-emerald-400"
              style={{ margin: '-24px' }}
            />
          )}

          {/* Second pulse ring */}
          {step >= 3 && (
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full border-2 border-emerald-300"
              style={{ margin: '-48px' }}
            />
          )}

          <motion.div
            animate={step >= 6 ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-56 h-56 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.4)]"
          >
            <ShieldCheck size={100} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Parent avatars — seg15 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 30 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-8"
        >
          <motion.div
            animate={step >= 6 ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="w-28 h-28 rounded-full bg-[#2E3192] flex items-center justify-center shadow-[0_0_40px_rgba(46,49,146,0.35)] border-4 border-white"
          >
            <Users size={52} className="text-white" />
          </motion.div>

          {/* Calm indicator dots between avatars */}
          {step >= 5 && (
            <div className="flex flex-col gap-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.15, type: 'spring' }}
                  className="w-3 h-3 rounded-full bg-emerald-400"
                />
              ))}
            </div>
          )}

          <motion.div
            animate={step >= 6 ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            className="w-28 h-28 rounded-full bg-[#E31E24] flex items-center justify-center shadow-[0_0_40px_rgba(227,30,36,0.35)] border-4 border-white"
          >
            <Users size={52} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Star row — calm trust indicators */}
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-4"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.1, type: 'spring', bounce: 0.6 }}
              >
                <Star size={32} className="text-emerald-400 fill-emerald-300" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
