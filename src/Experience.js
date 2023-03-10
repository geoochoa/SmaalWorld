import "./style.css";
import { Physics } from "@react-three/rapier";
import Lights from "./Lights.js";
import World from "./World.js";
import Player from "./Player.js";
import { useState } from "react";
import { Debug } from "@react-three/rapier";

export default function Experience({ setMsg, setDesc }) {
  const [idle, setIdle] = useState(true);
  return (
    <>
      <Physics gravity={[0, -0.1, 0]}>
        {/* <Debug /> */}
        <Lights />
        <World setMsg={setMsg} setDesc={setDesc} />
        <Player idle={idle} setIdle={(toggle) => setIdle(toggle)} />
      </Physics>
    </>
  );
}
