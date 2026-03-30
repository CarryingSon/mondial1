import { AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import SceneIntro from './scenes/SceneIntro';
import SceneOverview from './scenes/SceneOverview';
import Scene1Student from './scenes/Scene1Student';
import Scene5Package from './scenes/Scene5Package';
import Scene2Email from './scenes/Scene2Email';
import SceneReviewConfirm from './scenes/SceneReviewConfirm';
import Scene7Zoom from './scenes/Scene7Zoom';
import Scene8AltDate from './scenes/Scene8AltDate';
import SceneReassurance from './scenes/SceneReassurance';
import Scene9Summary from './scenes/Scene9Summary';

// Scene order matches the voiceover narrative:
//  1. SceneIntro        — "Začetek prijave je predregistracija"
//  2. SceneOverview     — visual process overview (bridge between intro & form)
//  3. Scene1Student     — "maturant izpolni obrazec" + "pravi kontaktni podatki"
//  4. Scene5Package     — "storitve osnovnega aranžmaja" + "dodatne možnosti + celoten pregled"
//  5. Scene2Email       — "starši prejmejo obvestilo in povezavo"
//  6. SceneReviewConfirm— "pregledajo in potrdijo"
//  7. Scene7Zoom        — "informativni sestanek" × 3 voiceover lines
//  8. Scene8AltDate     — "drug termin"
//  9. SceneReassurance  — "celoten postopek je jasen, pregleden in pomirjujoč"
// 10. Scene9Summary     — closing visual summary

// Total: ~72 500ms
const SCENE_DURATIONS = {
  sceneIntro:          3500,   // "Začetek prijave je predregistracija"
  sceneOverview:       4000,   // process overview bridge
  scene1Student:       9000,   // form fill (line 2) + contact data highlight (line 3)
  scene5Package:       12000,  // base services (line 4) + addons + total view (line 5)
  scene2Email:         5500,   // parents receive email (line 6)
  sceneReviewConfirm:  5500,   // parents confirm (line 7)
  scene7Zoom:          15000,  // info meeting × 3 lines (lines 8–10)
  scene8AltDate:       4500,   // alternate date (line 11)
  sceneReassurance:    7500,   // reassuring closing (line 12)
  scene9Summary:       6000,   // closing visual summary
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
        {/* Mondial Travel logo — always visible in top-left throughout all scenes */}
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
          {currentScene === 0 && <SceneIntro          key="sceneIntro" />}
          {currentScene === 1 && <SceneOverview        key="sceneOverview" />}
          {currentScene === 2 && <Scene1Student        key="scene1Student" />}
          {currentScene === 3 && <Scene5Package        key="scene5Package" />}
          {currentScene === 4 && <Scene2Email          key="scene2Email" />}
          {currentScene === 5 && <SceneReviewConfirm   key="sceneReviewConfirm" />}
          {currentScene === 6 && <Scene7Zoom           key="scene7Zoom" />}
          {currentScene === 7 && <Scene8AltDate        key="scene8AltDate" />}
          {currentScene === 8 && <SceneReassurance     key="sceneReassurance" />}
          {currentScene === 9 && <Scene9Summary        key="scene9Summary" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
