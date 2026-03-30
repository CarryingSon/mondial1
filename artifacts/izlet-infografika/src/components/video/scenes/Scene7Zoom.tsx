import { motion } from 'framer-motion';
import { Video, Users, Mic, MicOff, Globe, Wifi, BookOpen, CalendarDays } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene7Zoom() {
  const [step, setStep] = useState(0);

  // Total scene: 17000ms — covers 3 voiceover lines:
  // Line 8 (~8.5s): "ker si starši želeijo informacije... je omogočen informativni sestanek"
  //   → meeting window appears, participants join, live glow
  // Line 9 (~5s): "podrobneje predstavimo potek prijave, organizacijo, izlet"
  //   → presenter tile highlighted, topic icons appear in sidebar
  // Line 10 (~3.5s): "vsi sestanki potekajo preko spletnega srečanja"
  //   → globe/wifi icon pops in, second pulse wave as scene closes
  useSceneTimer([
    { time: 400,   callback: () => setStep(1) },  // window drops in
    { time: 1200,  callback: () => setStep(2) },  // tiles appear
    { time: 2800,  callback: () => setStep(3) },  // all tiles live + active glow (line 8 start)
    { time: 6000,  callback: () => setStep(4) },  // presenter highlight starts (line 9)
    { time: 7500,  callback: () => setStep(5) },  // topic icon 1 appears
    { time: 8800,  callback: () => setStep(6) },  // topic icon 2 appears
    { time: 10200, callback: () => setStep(7) },  // topic icon 3 appears
    { time: 11800, callback: () => setStep(8) },  // transition to "online" emphasis (line 10)
    { time: 13000, callback: () => setStep(9) },  // globe + wifi icons pop in
    { time: 14500, callback: () => setStep(10) }, // first glow pulse on online indicators
    { time: 16000, callback: () => setStep(11) }, // second pulse wave — final emphasis
  ]);

  const participants = [0, 1, 2, 3];
  const topicIcons = [BookOpen, CalendarDays, Globe];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-slate-900"
      {...sceneTransitions.scaleFade}
    >
      {/* Background glow */}
      <motion.div
        animate={{ opacity: step >= 3 ? 0.25 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-radial from-[#2E3192]/40 to-transparent"
        style={{ background: 'radial-gradient(ellipse at center, rgba(46,49,146,0.35) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-5xl px-8 flex items-center gap-8">

        {/* Main Zoom window */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: step >= 1 ? 0 : 60, opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
          className="flex-1 bg-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
          style={{ aspectRatio: '16/9' }}
        >
          {/* Toolbar */}
          <div className="h-10 bg-slate-700 flex items-center px-4 justify-between border-b border-slate-600 shrink-0">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-600 rounded-md">
              <Video size={14} className="text-blue-400" />
              <div className="w-20 h-2 bg-slate-500 rounded-full" />
            </div>
            {/* Recording dot */}
            {step >= 3 && (
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-3 h-3 rounded-full bg-red-500"
              />
            )}
            {step < 3 && <div className="w-4" />}
          </div>

          {/* Video Grid — 2x2 */}
          <div className="flex-1 p-3 grid grid-cols-2 gap-3">
            {participants.map((p) => {
              const isPresenter = p === 0 && step >= 4;
              return (
                <motion.div
                  key={p}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{
                    scale: step >= 2 ? 1 : 0.85,
                    opacity: step >= 2 ? 1 : 0,
                  }}
                  transition={{ delay: p * 0.12, duration: 0.4 }}
                  className="relative bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center"
                >
                  <motion.div
                    className={`rounded-full flex items-center justify-center shadow-lg ${
                      p === 0 ? 'bg-[#2E3192]'
                      : p === 1 ? 'bg-[#E31E24]'
                      : p === 2 ? 'bg-[#2E3192]/60'
                      : 'bg-[#E31E24]/60'
                    } text-white`}
                    animate={{ width: isPresenter ? 80 : 64, height: isPresenter ? 80 : 64 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Users size={isPresenter ? 32 : 24} />
                  </motion.div>

                  {/* Presenter highlight frame */}
                  {isPresenter && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 rounded-lg border-4 border-[#2E3192] pointer-events-none"
                    />
                  )}

                  {/* Mic status */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-slate-800/70 flex items-center justify-center backdrop-blur-sm">
                      {p === 0 && step >= 3 ? (
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                          <Mic size={10} className="text-emerald-400" />
                        </motion.div>
                      ) : (
                        <MicOff size={10} className="text-red-400/60" />
                      )}
                    </div>
                    <div className="w-12 h-2 bg-slate-800/70 rounded-full backdrop-blur-sm" />
                  </div>

                  {/* Live glow border */}
                  {step >= 3 && (
                    <motion.div
                      animate={{ opacity: [0.6, 0.15, 0.6] }}
                      transition={{ repeat: Infinity, duration: 1.8 + p * 0.3 }}
                      className={`absolute inset-0 rounded-lg pointer-events-none border-2 ${
                        p === 0 ? 'border-[#2E3192]' : 'border-[#E31E24]/40'
                      }`}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Controls bar */}
          <div className="h-12 bg-slate-700 flex items-center justify-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
              <Mic size={14} className="text-slate-300" />
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
              <Video size={14} className="text-slate-300" />
            </div>
            <div className="w-14 h-7 rounded-full bg-red-500/20 border border-red-500/30" />
          </div>
        </motion.div>

        {/* Right sidebar — topic icons (line 9) + online indicators (line 10) */}
        <div className="flex flex-col gap-6 w-40 shrink-0">

          {/* Topic icons — lines 9 */}
          {topicIcons.map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{
                opacity: step >= 5 + i ? 1 : 0,
                x: step >= 5 + i ? 0 : 30,
              }}
              transition={{ duration: 0.5 }}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                i % 2 === 0 ? 'bg-[#2E3192]/20 border border-[#2E3192]/40' : 'bg-[#E31E24]/10 border border-[#E31E24]/30'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                i % 2 === 0 ? 'bg-[#2E3192]' : 'bg-[#E31E24]'
              }`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className={`h-2 rounded-full ${i % 2 === 0 ? 'bg-[#2E3192]/30 w-full' : 'bg-[#E31E24]/30 w-3/4'}`} />
                <div className="h-1.5 bg-slate-600/30 rounded-full w-1/2" />
              </div>
            </motion.div>
          ))}

          {/* Online indicator — line 10 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: step >= 9 ? 1 : 0, scale: step >= 9 ? 1 : 0.8 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="flex flex-col items-center gap-3 p-4 bg-emerald-900/30 border border-emerald-500/40 rounded-xl"
          >
            <motion.div
              animate={step >= 11 ? { scale: [1, 1.2, 1] } : step >= 10 ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.8, repeat: step >= 11 ? Infinity : 2 }}
              className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center"
            >
              <Wifi size={22} className="text-white" />
            </motion.div>
            <motion.div
              animate={step >= 11 ? { scale: [1, 1.15, 1] } : step >= 10 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.8, repeat: step >= 11 ? Infinity : 2, delay: 0.2 }}
              className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center"
            >
              <Globe size={22} className="text-white" />
            </motion.div>
            {/* Second pulse ring at step 11 */}
            {step >= 11 && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-xl border-2 border-emerald-400/60 pointer-events-none"
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
