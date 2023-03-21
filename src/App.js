import "./style.css";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Perf } from "r3f-perf";
import { Debug } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";
import Experience from "./Experience.js";
import LoadingScreen from "./LoadingScreen.js";
import Interface from "./Interface.js";
import Messages from "./Messages.js";
import Nightmode from "./Nightmode.js";
import NavBar from "./NavBar.js";

export default function App() {
  const [start, setStart] = useState(true);
  const [msg, setMsg] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [nightMode, setMode] = useState(true);
  const [autoFwd, setAutoFwd] = useState(false);

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
            <Experience
              setMsg={(msg) => setMsg(msg)}
              setDesc={(desc) => setDesc(desc)}
              setLink={(link) => setLink(link)}
              nightMode={nightMode}
              autoFwd={autoFwd}
              setAutoFwd={() => setAutoFwd(false)}
            />
          </Suspense>
        </Canvas>
        <NavBar />
        {/* <Interface /> */}
        {/* <Nightmode mode={nightMode} switchMode={() => setMode(!nightMode)} /> */}
        {msg == ""
          ? false
          : true && (
              <Messages
                currMsg={msg}
                currDesc={desc}
                currLink={link}
                setAutoFwd={() => setAutoFwd(true)}
              />
            )}
        <LoadingScreen started={start} onStarted={() => setStart(true)} />
      </KeyboardControls>
    </>
  );
}
