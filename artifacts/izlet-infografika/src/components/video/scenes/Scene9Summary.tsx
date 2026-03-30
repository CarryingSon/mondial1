import { motion } from 'framer-motion';
import { User, Mail, CheckCircle2, Video, CalendarDays } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

const NODES = [
  { icon: User,         color: 'text-slate-400', bg: 'bg-slate-50',    border: 'border-slate-200', size: 32, nodeSize: 'w-20 h-20' },
  { icon: Mail,         color: 'text-white',      bg: 'bg-[#2E3192]',   border: 'border-[#2E3192]', size: 44, nodeSize: 'w-32 h-32' },
  { icon: CheckCircle2, color: 'text-white',      bg: 'bg-[#E31E24]',   border: 'border-[#E31E24]', size: 44, nodeSize: 'w-32 h-32' },
  { icon: Video,        color: 'text-white',      bg: 'bg-[#2E3192]',   border: 'border-[#2E3192]', size: 44, nodeSize: 'w-32 h-32' },
  { icon: CalendarDays, color: 'text-white',      bg: 'bg-[#E31E24]',   border: 'border-[#E31E24]', size: 44, nodeSize: 'w-32 h-32' },
];

export default function Scene9Summary() {
  const [step, setStep] = useState(0);
  const [pulseIdx, setPulseIdx] = useState(-1);

  // Total scene: 6690ms
  // segs 18+19 (69.31–75.23, ~5.9s): CTA + closing with pulse wave
  useSceneTimer([
    { time: 400,  callback: () => setStep(1) },
    { time: 900,  callback: () => setStep(2) },
    { time: 1400, callback: () => setStep(3) },
    { time: 1900, callback: () => setStep(4) },
    { time: 2400, callback: () => setStep(5) },
    // Pulse wave left → right
    { time: 3500, callback: () => setPulseIdx(0) },
    { time: 4000, callback: () => setPulseIdx(1) },
    { time: 4500, callback: () => setPulseIdx(2) },
    { time: 5000, callback: () => setPulseIdx(3) },
    { time: 5500, callback: () => setPulseIdx(4) },
    { time: 6100, callback: () => setPulseIdx(-1) },
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-white"
      {...sceneTransitions.zoomThrough}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#2E3192 1px, transparent 1px), linear-gradient(90deg, #2E3192 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl px-12">
        <div className="flex items-center justify-between w-full relative">

          {/* Connecting progress line */}
          <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-2 bg-slate-100 rounded-full -z-10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #2E3192, #E31E24)' }}
              initial={{ width: 0 }}
              animate={{ width: step >= 5 ? '100%' : `${(step / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {NODES.map((node, i) => {
            const Icon = node.icon;
            const isVisible = step >= i + 1;
            const isPulsing = pulseIdx === i;

            return (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="flex flex-col items-center gap-4 relative z-10"
              >
                <motion.div
                  animate={isPulsing ? { scale: [1, 1.18, 1], boxShadow: ['0 0 0px rgba(46,49,146,0)', '0 0 30px rgba(46,49,146,0.4)', '0 0 0px rgba(46,49,146,0)'] } : {}}
                  transition={{ duration: 0.5 }}
                  className={`${node.nodeSize} rounded-full ${node.bg} ${node.border} border-4 flex items-center justify-center shadow-lg`}
                >
                  <Icon size={node.size} className={node.color} />
                </motion.div>

                {/* Dot indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-8 h-2 bg-slate-200 rounded-full"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mondial branding strip at bottom */}
        {step >= 5 && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #2E3192, #E31E24, #2E3192)', transformOrigin: 'left' }}
          />
        )}
      </div>
    </motion.div>
  );
}
