import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { useSceneTimer } from '@/lib/video/hooks';
import { useState } from 'react';

export default function SceneIntro() {
  const [step, setStep] = useState(0);

  useSceneTimer([
    { time: 400, callback: () => setStep(1) },
    { time: 1200, callback: () => setStep(2) },
    { time: 2200, callback: () => setStep(3) },
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2E3192 0%, #1a1d6e 60%, #0f1250 100%)' }}
      {...sceneTransitions.fadeBlur}
    >
      {/* Animated background circles */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: step >= 1 ? 1 : 0, opacity: step >= 1 ? 0.12 : 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute w-[900px] h-[900px] rounded-full border-2 border-white"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: step >= 1 ? 1 : 0, opacity: step >= 1 ? 0.08 : 0 }}
        transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
        className="absolute w-[1200px] h-[1200px] rounded-full border border-white"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Red accent strip — bottom-left */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: step >= 2 ? 0 : -300, opacity: step >= 2 ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-64 h-3 bg-[#E31E24] rounded-tr-full"
      />
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: step >= 2 ? 0 : -300, opacity: step >= 2 ? 0.5 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        className="absolute bottom-3 left-0 w-40 h-2 bg-[#E31E24] rounded-tr-full"
      />

      {/* Red accent strip — top-right */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: step >= 2 ? 0 : 300, opacity: step >= 2 ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-0 right-0 w-64 h-3 bg-[#E31E24] rounded-bl-full"
      />

      {/* Large logo centrepiece — fades in prominently */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 20 }}
        animate={{
          scale: step >= 1 ? 1 : 0.7,
          opacity: step >= 1 ? 1 : 0,
          y: step >= 1 ? 0 : 20,
        }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <img
          src={`${import.meta.env.BASE_URL}mondial-logo.png`}
          alt="Mondial Travel"
          style={{ width: 600, height: 'auto', display: 'block' }}
        />
      </motion.div>

      {/* Subtitle bar */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: step >= 3 ? 1 : 0, opacity: step >= 3 ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 h-1 w-80 bg-[#E31E24] rounded-full"
        style={{ transformOrigin: 'center' }}
      />
    </motion.div>
  );
}
