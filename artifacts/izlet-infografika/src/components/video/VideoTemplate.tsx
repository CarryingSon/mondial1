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
//  1. SceneIntro        — line 1:  "Začetek prijave je predregistracija"            (~3.5s)
//  2. SceneOverview     — line 2:  "Takrat maturant izpolni obrazec…"               (~5s)
//  3. Scene1Student     — line 3:  "Pravi kontaktni podatki…"                       (~7s)
//  4. Scene5Package     — lines 4+5: base services + add-ons + total view           (~11.5s)
//  5. Scene2Email       — line 6:  "starši prejmejo obvestilo in povezavo"          (~7s)
//  6. SceneReviewConfirm— line 7:  "pregledajo in potrdijo"                         (~3.5s)
//  7. Scene7Zoom        — lines 8-10: info meeting × 3 voiceover lines              (~17s)
//  8. Scene8AltDate     — line 11: "drug termin"                                    (~5s)
//  9. SceneReassurance  — line 12: "jasen, pregleden in pomirjujoč"                 (~5.5s)
// 10. Scene9Summary     — closing visual outro                                       (~7s)

// Total: ~76 500ms  ≈  75s voiceover + ~1.5s buffer
const SCENE_DURATIONS = {
  sceneIntro:          3500,   // line 1
  sceneOverview:       5000,   // line 2
  scene1Student:       8000,   // line 3
  scene5Package:       11000,  // lines 4+5
  scene2Email:         8000,   // line 6
  sceneReviewConfirm:  5500,   // line 7  — timers compressed to fit all 9 steps
  scene7Zoom:          17000,  // lines 8–10 (3 sentences, 11 steps)
  scene8AltDate:       5500,   // line 11
  sceneReassurance:    6000,   // line 12
  scene9Summary:       7000,   // outro (pulse wave at 6.4s fits within 7s)
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
