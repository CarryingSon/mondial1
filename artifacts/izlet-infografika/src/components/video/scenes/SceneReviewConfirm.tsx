import { motion } from 'framer-motion';
import { FileText, CheckCircle2, User, MapPin, MousePointer2, Check } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function SceneReviewConfirm() {
  const [step, setStep] = useState(0);

  // Total scene: 5500ms
  // "Tako lahko prijavo enostavno pregledajo in jo potrdijo." (~3.5s)
  // All 9 animation steps compressed to fit — parents→form→cursor→click→checkmark
  useSceneTimer([
    { time: 250,  callback: () => setStep(1) },  // parents appear
    { time: 700,  callback: () => setStep(2) },  // form slides in
    { time: 1300, callback: () => setStep(3) },  // form content reveals
    { time: 1900, callback: () => setStep(4) },  // cursor appears
    { time: 2500, callback: () => setStep(5) },  // cursor moves to button
    { time: 3100, callback: () => setStep(6) },  // button clicked
    { time: 3600, callback: () => setStep(7) },  // success state
    { time: 4100, callback: () => setStep(8) },  // big checkmark
    { time: 4700, callback: () => setStep(9) },  // pulse
  ]);

  const showConfirmPhase = step >= 4;
  const showSuccessPhase = step >= 7;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-warm.png)` }}
      {...sceneTransitions.fadeBlur}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md" />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-3xl">

        {/* Parent Avatars */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -20 }}
          transition={{ duration: 0.6 }}
          className="flex gap-6 z-20"
        >
          <div className="w-24 h-24 rounded-full bg-[#2E3192] flex items-center justify-center shadow-xl border-4 border-white">
            <User size={40} className="text-white" />
          </div>
          <div className="w-24 h-24 rounded-full bg-[#E31E24] flex items-center justify-center shadow-xl border-4 border-white mt-4">
            <User size={40} className="text-white" />
          </div>
        </motion.div>

        {/* Document review phase (steps 1-6) */}
        {!showSuccessPhase && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: step >= 2 ? 0 : 50, opacity: step >= 2 ? 1 : 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border-4 border-[#E31E24]"
          >
            {/* Glowing outline */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-4 border-[#E31E24] pointer-events-none rounded-3xl"
            />

            {/* Header */}
            <div className="bg-[#2E3192] h-20 flex items-center px-8 gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <FileText size={20} className="text-white" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-32 h-3 bg-white/30 rounded-full" />
                <div className="w-48 h-2 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Content body */}
            <div className="p-8 flex gap-8">
              <div className="flex-1 space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-50 p-4 rounded-xl flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                    <User size={20} className="text-slate-500" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="w-full h-3 bg-slate-200 rounded-full" />
                    <div className="w-2/3 h-2 bg-slate-200 rounded-full" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : -20 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="bg-red-50 p-4 rounded-xl flex items-center gap-4 border border-red-100"
                >
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <User size={20} className="text-[#E31E24]" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="w-full h-3 bg-red-100 rounded-full" />
                    <div className="w-3/4 h-2 bg-red-100 rounded-full" />
                  </div>
                </motion.div>
              </div>

              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: step >= 3 ? 1 : 0, scale: step >= 3 ? 1 : 0.9 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="h-full border-2 border-dashed border-[#E31E24]/50 rounded-xl p-6 flex flex-col items-center justify-center bg-red-50/30"
                >
                  <MapPin size={28} className="text-[#E31E24] mb-3" />
                  <div className="w-20 h-3 bg-red-100 rounded-full mb-2" />
                  <div className="w-14 h-2 bg-red-50 rounded-full" />
                </motion.div>
              </div>
            </div>

            {/* Confirm button — appears at step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 10 }}
              transition={{ duration: 0.4 }}
              className="px-8 pb-6"
            >
              <motion.div
                animate={{
                  backgroundColor: step >= 6 ? '#10B981' : step >= 5 ? '#059669' : '#2E3192',
                  scale: step >= 6 ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-14 rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  {step >= 6 ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check size={14} className="text-white" />
                    </motion.div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <div className="w-28 h-4 bg-white/40 rounded-full" />

                {/* Ripple on click */}
                {step === 5 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-white/30 rounded-full"
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Cursor */}
        {step >= 4 && !showSuccessPhase && (
          <motion.div
            initial={{ x: 150, y: 80, opacity: 0 }}
            animate={{
              x: step >= 5 ? 0 : 150,
              y: step >= 5 ? 30 : 80,
              opacity: step >= 6 ? 0 : 1,
              scale: step === 5 ? 0.9 : 1,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute z-50 text-slate-800"
            style={{ bottom: '8rem', right: '6rem' }}
          >
            <MousePointer2 size={32} className="fill-white drop-shadow" />
          </motion.div>
        )}

        {/* Success Explosion — step 8 */}
        {showSuccessPhase && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              className="w-72 h-72 bg-emerald-100 rounded-full flex items-center justify-center"
              animate={step >= 9 ? { scale: [1, 1.06, 1] } : {}}
              transition={{ duration: 0.5, repeat: 1 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
                className="w-52 h-52 bg-emerald-200 rounded-full flex items-center justify-center"
              >
                <Check size={96} className="text-emerald-600" />
              </motion.div>
            </motion.div>

            {/* Parent avatars reappear with glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex gap-8"
            >
              <div className="w-20 h-20 rounded-full bg-[#2E3192] flex items-center justify-center shadow-[0_0_30px_rgba(46,49,146,0.4)] border-4 border-white">
                <User size={32} className="text-white" />
              </div>
              <div className="w-20 h-20 rounded-full bg-[#E31E24] flex items-center justify-center shadow-[0_0_30px_rgba(227,30,36,0.4)] border-4 border-white">
                <User size={32} className="text-white" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
