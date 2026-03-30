import { motion } from 'framer-motion';
import { Mail, Users, Link, Bell } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene2Email() {
  const [step, setStep] = useState(0);

  // Total scene: 9000ms
  // "Ko je obrazec oddan, starši oziroma zakoniti zastopniki prejmejo
  //  obvestilo in POVEZAVO za potrditev prijave."
  // — envelope travels, parents react, then notification + link badge appear
  useSceneTimer([
    { time: 500,  callback: () => setStep(1) },  // envelope + parents appear
    { time: 1800, callback: () => setStep(2) },  // envelope arcs forward
    { time: 3200, callback: () => setStep(3) },  // envelope arrives at parents, ping
    { time: 4400, callback: () => setStep(4) },  // notification bell pops in
    { time: 5800, callback: () => setStep(5) },  // link badge appears ("povezava")
    { time: 7200, callback: () => setStep(6) },  // parents glow — attention on them
    { time: 8200, callback: () => setStep(7) },  // pulse ring repeats
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-blue.png)` }}
      {...sceneTransitions.slideLeft}
    >
      <div className="absolute inset-0 bg-[#2E3192]/80 backdrop-blur-md" />

      <div className="relative z-10 flex items-center justify-center w-full max-w-5xl mx-auto gap-16">

        {/* Left side: envelope + notification badge */}
        <div className="relative flex flex-col items-center gap-8">

          {/* Email Envelope */}
          <motion.div
            initial={{ x: -300, y: 60, scale: 0, opacity: 0 }}
            animate={{
              x: step >= 3 ? 0 : step >= 2 ? 40 : step >= 1 ? 0 : -300,
              y: step >= 3 ? 0 : step >= 2 ? -50 : step >= 1 ? 0 : 60,
              scale: step >= 3 ? 0.85 : step >= 1 ? 1 : 0,
              opacity: step >= 3 ? 0.35 : step >= 1 ? 1 : 0,
              rotate: step >= 2 ? 6 : -8,
            }}
            transition={{ duration: 1.2, type: 'spring', bounce: 0.2 }}
            className="relative"
          >
            {/* Arc trail while flying */}
            {step >= 1 && step < 3 && (
              <motion.div
                className="absolute right-full top-1/2 h-3 bg-gradient-to-r from-transparent to-white/40 rounded-full blur-sm"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 260, opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ transformOrigin: 'right center', rotate: -6 }}
              />
            )}
            <div className="w-32 h-24 bg-white rounded-xl flex items-center justify-center shadow-2xl relative overflow-hidden">
              <div
                className="absolute top-0 inset-x-0 h-1/2 bg-slate-100 border-b border-slate-200"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />
              <Mail size={44} className="text-[#2E3192] relative z-10" />
            </div>
          </motion.div>

          {/* Notification badge — step 4 */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: step >= 4 ? 1 : 0, opacity: step >= 4 ? 1 : 0 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            className="flex items-center gap-3 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/30"
          >
            <motion.div
              animate={step >= 4 ? { rotate: [-10, 10, -8, 8, 0] } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Bell size={24} className="text-yellow-300" />
            </motion.div>
            <div className="space-y-1.5">
              <div className="w-28 h-2.5 bg-white/40 rounded-full" />
              <div className="w-20 h-2 bg-white/25 rounded-full" />
            </div>
          </motion.div>

          {/* Link badge — step 5 ("povezava") */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: step >= 5 ? 1 : 0, opacity: step >= 5 ? 1 : 0, y: step >= 5 ? 0 : 10 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="flex items-center gap-3 bg-emerald-500/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-emerald-400/50"
          >
            <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center shrink-0">
              <Link size={16} className="text-white" />
            </div>
            <div className="space-y-1.5">
              <div className="w-32 h-2.5 bg-emerald-300/50 rounded-full" />
              <div className="w-20 h-2 bg-emerald-200/30 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Parent Avatars */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.85 }}
          animate={{
            opacity: step >= 1 ? 1 : 0,
            x: step >= 1 ? 0 : 80,
            scale: step >= 6 ? 1.06 : step >= 3 ? 1.03 : 1,
          }}
          transition={{ duration: 0.9, type: 'spring', bounce: 0.35 }}
          className="relative flex flex-col items-center gap-10"
        >
          {/* Arrival ping ring */}
          {step >= 3 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
              className="absolute inset-0 rounded-full border-4 border-[#E31E24]"
            />
          )}

          {/* Second glow ring — step 7 */}
          {step >= 7 && (
            <motion.div
              initial={{ scale: 1.1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-white/40"
            />
          )}

          <div className="flex gap-6 relative">
            <motion.div
              animate={step >= 6 ? { boxShadow: '0 0 60px rgba(46,49,146,0.7)' } : { boxShadow: '0 0 50px rgba(46,49,146,0.5)' }}
              transition={{ duration: 0.6 }}
              className="w-52 h-52 rounded-full bg-[#2E3192] flex items-center justify-center border-8 border-white z-20 relative"
            >
              <Users size={88} className="text-white" />
            </motion.div>
            <motion.div
              animate={step >= 6 ? { boxShadow: '0 0 60px rgba(227,30,36,0.7)' } : { boxShadow: '0 0 50px rgba(227,30,36,0.5)' }}
              transition={{ duration: 0.6 }}
              className="w-44 h-44 rounded-full bg-[#E31E24] flex items-center justify-center border-8 border-white -ml-16 mt-8 z-10 relative"
            >
              <Users size={72} className="text-white" />
            </motion.div>
          </div>

          {/* Read receipt dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: step >= 4 ? 1 : 0 }}
            transition={{ type: 'spring', bounce: 0.6, delay: 0.1 }}
            className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center"
          >
            <motion.div
              animate={step >= 5 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-6 bg-[#E31E24] rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
