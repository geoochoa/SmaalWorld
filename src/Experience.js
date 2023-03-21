import "./style.css";
import { Physics } from "@react-three/rapier";
import Lights from "./Lights.js";
import World from "./World.js";
import Player from "./Player.js";
import { useState } from "react";
import { Debug } from "@react-three/rapier";
import { Sparkles, Sky, Stars } from "@react-three/drei";

export default function Experience({
  setMsg,
  setDesc,
  setLink,
  autoFwd,
  setAutoFwd,
  nightMode,
}) {
  const [idle, setIdle] = useState(true);

  return (
    <>
      <Physics gravity={[0, -0.1, 0]}>
        {/* <Debug /> */}
        <Lights />
        {nightMode == false ? (
          <Sky />
        ) : (
          <Stars radius={30} factor={3} depth={50} fade speed={0.1} />
        )}
        <World
          setMsg={setMsg}
          setDesc={setDesc}
          setLink={setLink}
          idle={idle}
          setIdle={() => setIdle(false)}
          autoFwd={autoFwd}
          setAutoFwd={setAutoFwd}
        />
        <Player
          autoFwd={autoFwd}
          idle={idle}
          setIdle={(toggle) => setIdle(toggle)}
        />
      </Physics>
    </>
  );
}
