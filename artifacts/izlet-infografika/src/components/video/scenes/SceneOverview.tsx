import { motion } from 'framer-motion';
import { User, Mail, CheckCircle2, Package, CalendarDays } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

const STEPS = [
  { Icon: User, bg: 'bg-slate-100', iconColor: 'text-slate-500', ring: 'border-slate-300' },
  { Icon: Mail, bg: 'bg-[#2E3192]', iconColor: 'text-white', ring: 'border-[#2E3192]' },
  { Icon: CheckCircle2, bg: 'bg-[#E31E24]', iconColor: 'text-white', ring: 'border-[#E31E24]' },
  { Icon: Package, bg: 'bg-[#2E3192]', iconColor: 'text-white', ring: 'border-[#2E3192]' },
  { Icon: CalendarDays, bg: 'bg-[#E31E24]', iconColor: 'text-white', ring: 'border-[#E31E24]' },
];

export default function SceneOverview() {
  const [step, setStep] = useState(0);

  useSceneTimer([
    { time: 400, callback: () => setStep(1) },
    { time: 1000, callback: () => setStep(2) },
    { time: 1700, callback: () => setStep(3) },
    { time: 2400, callback: () => setStep(4) },
    { time: 3100, callback: () => setStep(5) },
    { time: 4000, callback: () => setStep(6) },
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-white"
      {...sceneTransitions.slideLeft}
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#2E3192 1px, transparent 1px), linear-gradient(90deg, #2E3192 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-16 w-full max-w-5xl px-12">

        {/* Progress line behind icons */}
        <div className="flex items-center justify-between w-full relative">

          {/* Background track */}
          <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-2 bg-slate-100 rounded-full" />

          {/* Animated fill */}
          <motion.div
            className="absolute left-16 top-1/2 -translate-y-1/2 h-2 rounded-full"
            style={{ background: 'linear-gradient(90deg, #2E3192, #E31E24)' }}
            initial={{ width: 0 }}
            animate={{ width: step >= 6 ? 'calc(100% - 128px)' : `${Math.max(0, ((step - 1) / 4) * (100))}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {STEPS.map((s, i) => {
            const { Icon } = s;
            const isVisible = step >= i + 1;
            const isActive = step >= 6;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="flex flex-col items-center gap-4 relative z-10"
              >
                <motion.div
                  animate={{ scale: isActive ? [1, 1.08, 1] : 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1, repeat: isActive ? 1 : 0 }}
                  className={`w-28 h-28 rounded-full ${s.bg} border-4 ${s.ring} flex items-center justify-center shadow-xl`}
                >
                  <Icon size={48} className={s.iconColor} />
                </motion.div>

                {/* Step indicator dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: isVisible ? 1 : 0 }}
                  transition={{ delay: 0.2 }}
                  className={`w-5 h-5 rounded-full shadow border-2 border-white ${
                    i === 0 ? 'bg-slate-300' : i % 2 === 1 ? 'bg-[#2E3192]' : 'bg-[#E31E24]'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
