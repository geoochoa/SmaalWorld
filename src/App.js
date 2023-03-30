import "./style.css";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useCallback, useMemo } from "react";
import { Perf } from "r3f-perf";
import { Debug } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";
import Experience from "./Experience.js";
import LoadingScreen from "./LoadingScreen.js";
import NavBar from "./NavBar.js";

export default function App() {
  const [start, setStart] = useState(false);

  return (
    <>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          flat
          shadows
          camera={{
            fov: 28,
            near: 0.1,
            far: 200,
            position: [0, 0, 5],
          }}
        >
          {/* <Perf /> */}
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
        <NavBar />
        <LoadingScreen started={start} onStarted={() => setStart(true)} />
      </KeyboardControls>
    </>
  );
}
