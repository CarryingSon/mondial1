import { AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import Scene1Student from './scenes/Scene1Student';
import Scene2Email from './scenes/Scene2Email';
import Scene3Review from './scenes/Scene3Review';
import Scene4Confirm from './scenes/Scene4Confirm';
import Scene5Package from './scenes/Scene5Package';
import Scene6Total from './scenes/Scene6Total';
import Scene7Zoom from './scenes/Scene7Zoom';
import Scene8AltDate from './scenes/Scene8AltDate';
import Scene9Summary from './scenes/Scene9Summary';

const SCENE_DURATIONS = {
  scene1: 3000,
  scene2: 5000,
  scene3: 4000,
  scene4: 4000,
  scene5: 4000,
  scene6: 4000,
  scene7: 4000,
  scene8: 4000,
  scene9: 5000,
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black overflow-hidden relative">
      <div
        className="relative overflow-hidden shrink-0"
        style={{ 
          width: '1920px',
          height: '1080px',
          transform: 'scale(min(100vw / 1920, 100vh / 1080))',
          transformOrigin: 'center center',
          backgroundColor: 'var(--color-bg-light)' 
        }}
      >
        {/* Mondial Travel logo — always visible top-left */}
        <div
          className="absolute top-8 left-8 z-50 pointer-events-none"
          style={{ width: 280 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}mondial-logo.png`}
            alt="Mondial Travel"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <AnimatePresence mode="wait">
          {currentScene === 0 && <Scene1Student key="scene1" />}
          {currentScene === 1 && <Scene2Email key="scene2" />}
          {currentScene === 2 && <Scene3Review key="scene3" />}
          {currentScene === 3 && <Scene4Confirm key="scene4" />}
          {currentScene === 4 && <Scene5Package key="scene5" />}
          {currentScene === 5 && <Scene6Total key="scene6" />}
          {currentScene === 6 && <Scene7Zoom key="scene7" />}
          {currentScene === 7 && <Scene8AltDate key="scene8" />}
          {currentScene === 8 && <Scene9Summary key="scene9" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
