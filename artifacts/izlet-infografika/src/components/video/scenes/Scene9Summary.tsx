import { motion } from 'framer-motion';
import { User, Mail, CheckCircle2, Video, CalendarDays, ArrowRight } from 'lucide-react';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export default function Scene9Summary() {
  const [step, setStep] = useState(0);

  useSceneTimer([
    { time: 500, callback: () => setStep(1) },
    { time: 1000, callback: () => setStep(2) },
    { time: 1500, callback: () => setStep(3) },
    { time: 2000, callback: () => setStep(4) },
    { time: 2500, callback: () => setStep(5) },
  ]);

  const nodes = [
    { icon: User, color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200', size: 80, nodeSize: 'w-20 h-20' },
    { icon: Mail, color: 'text-white', bg: 'bg-[#2E3192]', border: 'border-[#2E3192]', size: 40, nodeSize: 'w-32 h-32' },
    { icon: CheckCircle2, color: 'text-white', bg: 'bg-[#E31E24]', border: 'border-[#E31E24]', size: 40, nodeSize: 'w-32 h-32' },
    { icon: Video, color: 'text-white', bg: 'bg-[#2E3192]', border: 'border-[#2E3192]', size: 40, nodeSize: 'w-32 h-32' },
    { icon: CalendarDays, color: 'text-white', bg: 'bg-[#E31E24]', border: 'border-[#E31E24]', size: 40, nodeSize: 'w-32 h-32' },
  ];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-slate-50"
      {...sceneTransitions.zoomThrough}
    >
      <div className="relative z-10 w-full max-w-6xl px-12">
        
        <div className="flex items-center justify-between w-full relative">
          
          {/* Connecting Line */}
          <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-2 bg-slate-100 rounded-full -z-10 overflow-hidden">
            <motion.div
              className="h-full bg-blue-200"
              initial={{ width: 0 }}
              animate={{ width: step >= 5 ? '100%' : `${(step / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {nodes.map((node, i) => {
            const Icon = node.icon;
            const isVisible = step >= i + 1;
            
            return (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className={`${node.nodeSize} rounded-full ${node.bg} ${node.border} border-4 flex items-center justify-center shadow-lg relative`}
              >
                <Icon size={node.size} className={node.color} />
                
                {/* Micro decorative elements under each node */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-8 flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-2 bg-slate-200 rounded-full" />
                </motion.div>
              </motion.div>
            );
          })}
          
        </div>

      </div>
    </motion.div>
  );
}
