import { AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import SceneIntro from './scenes/SceneIntro';
import SceneOverview from './scenes/SceneOverview';
import Scene1Student from './scenes/Scene1Student';
import Scene2Email from './scenes/Scene2Email';
import SceneReviewConfirm from './scenes/SceneReviewConfirm';
import Scene5Package from './scenes/Scene5Package';
import Scene7Zoom from './scenes/Scene7Zoom';
import SceneReassurance from './scenes/SceneReassurance';
import Scene8AltDate from './scenes/Scene8AltDate';
import Scene6Total from './scenes/Scene6Total';
import Scene9Summary from './scenes/Scene9Summary';

// Total: ~75 260ms — matches voiceover segments 1-19
const SCENE_DURATIONS = {
  sceneIntro:          3500,   // seg 1:  0.00–3.49
  sceneOverview:       5100,   // seg 2:  3.98–8.58
  scene1Student:       8840,   // segs 3-5: 9.26–17.42
  scene2Email:         5200,   // seg 6:  18.05–22.61
  sceneReviewConfirm:  10120,  // segs 7-9: 23.31–32.73
  scene5Package:       16020,  // segs 10-12: 33.05–48.75
  scene7Zoom:          3440,   // seg 13: 48.99–52.19
  sceneReassurance:    7010,   // segs 14-15: 52.88–59.20
  scene8AltDate:       4260,   // seg 16: 59.86–63.46
  scene6Total:         5080,   // seg 17: 64.17–68.54
  scene9Summary:       6690,   // segs 18-19: 69.31–75.23
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
          backgroundColor: 'var(--color-bg-light)',
        }}
      >
        {/* Mondial Travel logo — always visible top-left (hidden on SceneIntro where it's centred) */}
        {currentScene !== 0 && (
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
        )}

        <AnimatePresence mode="wait">
          {currentScene === 0  && <SceneIntro         key="sceneIntro" />}
          {currentScene === 1  && <SceneOverview       key="sceneOverview" />}
          {currentScene === 2  && <Scene1Student       key="scene1Student" />}
          {currentScene === 3  && <Scene2Email         key="scene2Email" />}
          {currentScene === 4  && <SceneReviewConfirm  key="sceneReviewConfirm" />}
          {currentScene === 5  && <Scene5Package       key="scene5Package" />}
          {currentScene === 6  && <Scene7Zoom          key="scene7Zoom" />}
          {currentScene === 7  && <SceneReassurance    key="sceneReassurance" />}
          {currentScene === 8  && <Scene8AltDate       key="scene8AltDate" />}
          {currentScene === 9  && <Scene6Total         key="scene6Total" />}
          {currentScene === 10 && <Scene9Summary       key="scene9Summary" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
