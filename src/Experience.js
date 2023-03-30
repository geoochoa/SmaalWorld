import "./style.css";
import { Physics } from "@react-three/rapier";
import Lights from "./Lights.js";
import World from "./World.js";
import Player from "./Player.js";
import { useState, useCallback } from "react";
import { Debug } from "@react-three/rapier";
import { Sky, Stars } from "@react-three/drei";
import Messages from "./Messages.js";

export default function Experience() {
  // const [idle, setIdle] = useState(true);

  return (
    <>
      <Physics gravity={[0, -0.1, 0]}>
        {/* <Debug /> */}
        <Lights />
        <Stars radius={30} factor={3} depth={50} fade speed={0.1} />
        <World />
        <Player />
      </Physics>
    </>
  );
}
