import { OrbitControls } from "@react-three/drei";
import { Physics, Debug } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import Lights from "./Lights.js";
import World from "./World.js";
import Player from "./Player.js";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <Physics gravity={[0, -9.81, 0]}>
        <Debug />
        <Lights />
        <World />
        <Player />
      </Physics>
    </>
  );
}
