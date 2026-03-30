import { motion } from 'framer-motion';
import { User, FileText, Check, Phone, Mail as MailIcon, ArrowRight } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene1Student() {
  const [step, setStep] = useState(0);

  // Total scene: 9000ms
  // Line 2 (~4s): student fills form — 3 regular fields fill with checkmarks
  // Line 3 (~5s): contact data emphasized — phone + email fields glow, then submit
  useSceneTimer([
    { time: 400,  callback: () => setStep(1) },  // student + form appear
    { time: 1400, callback: () => setStep(2) },  // field 1 fills
    { time: 2400, callback: () => setStep(3) },  // field 2 fills
    { time: 3400, callback: () => setStep(4) },  // field 3 fills — end of line 2
    { time: 4400, callback: () => setStep(5) },  // contact data section highlights (line 3)
    { time: 5600, callback: () => setStep(6) },  // contact fields glow
    { time: 7000, callback: () => setStep(7) },  // submit button appears + glows
    { time: 8200, callback: () => setStep(8) },  // handoff arrow
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-warm.png)` }}
      {...sceneTransitions.fadeBlur}
    >
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

      <div className="relative flex items-center gap-12 z-10">

        {/* Student Avatar */}
        <motion.div
          animate={{
            scale: step >= 7 ? 0.6 : 1,
            opacity: step >= 7 ? 0.2 : 1,
            x: step >= 7 ? -80 : 0,
          }}
          transition={{ duration: 0.9, ease: 'circOut' }}
          className="flex flex-col items-center gap-4 shrink-0"
        >
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center shadow-md border-4 border-white">
            <User size={44} className="text-slate-400" />
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <div className="w-10 h-3 rounded-full bg-slate-200" />
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: step >= 1 ? 1 : 0,
            y: step >= 1 ? 0 : 30,
          }}
          transition={{ duration: 0.7, ease: 'circOut' }}
          className="relative bg-white rounded-2xl shadow-xl w-80 border border-slate-100 overflow-hidden"
        >
          {/* Form header */}
          <div className="bg-[#2E3192] h-14 flex items-center px-5 gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="w-28 h-2.5 bg-white/30 rounded-full" />
              <div className="w-20 h-2 bg-white/20 rounded-full" />
            </div>
          </div>

          <div className="p-6 space-y-4">
            {/* Regular form fields (line 2) */}
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: step >= 2 + i ? 1 : 0 }}
                    transition={{ type: 'spring', bounce: 0.6 }}
                  >
                    <Check size={14} className="text-emerald-500" />
                  </motion.div>
                </div>
                <div className="h-4 bg-slate-100 rounded-full flex-1 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#2E3192]/25"
                    initial={{ width: 0 }}
                    animate={{ width: step >= 2 + i ? '100%' : step >= 1 ? '30%' : '0%' }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                  />
                </div>
              </div>
            ))}

            {/* Divider — separates contact section */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: step >= 5 ? 1 : 0, scaleX: step >= 5 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-px bg-gradient-to-r from-[#2E3192]/30 to-[#E31E24]/30 rounded-full"
              style={{ transformOrigin: 'left' }}
            />

            {/* Contact data fields — highlighted on line 3 */}
            {[
              { Icon: Phone,    color: '#2E3192' },
              { Icon: MailIcon, color: '#E31E24' },
            ].map(({ Icon, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: step >= 5 ? 1 : 0,
                  x: step >= 5 ? 0 : -10,
                }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-500 ${
                  step >= 6
                    ? 'border-current bg-blue-50 shadow-md'
                    : 'border-transparent bg-slate-50'
                }`}
                style={{ borderColor: step >= 6 ? color : 'transparent' }}
              >
                <motion.div
                  animate={{ scale: step >= 6 ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon size={16} style={{ color }} />
                </motion.div>
                <div className="flex-1 space-y-1.5">
                  <motion.div
                    className="h-3 rounded-full"
                    initial={{ width: '40%' }}
                    animate={{ width: step >= 6 ? '100%' : '40%', backgroundColor: step >= 6 ? `${color}40` : '#e2e8f0' }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="h-2 bg-slate-100 rounded-full w-2/3" />
                </div>

                {/* Animated checkmark on contact fields */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: step >= 6 ? 1 : 0 }}
                  transition={{ type: 'spring', bounce: 0.6, delay: 0.2 + i * 0.1 }}
                >
                  <Check size={16} className="text-emerald-500" />
                </motion.div>
              </motion.div>
            ))}

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: step >= 7 ? 1 : 0,
                y: step >= 7 ? 0 : 8,
                scale: step >= 7 ? 1.02 : 1,
              }}
              transition={{ duration: 0.4 }}
              className="w-full h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Check size={26} className="text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Handoff arrow → parents */}
        {step >= 8 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center shrink-0"
          >
            <motion.div
              className="h-2 rounded-full"
              style={{ background: 'linear-gradient(90deg, #2E3192, #E31E24)' }}
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
            >
              <ArrowRight size={48} className="text-[#E31E24] -ml-3" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
