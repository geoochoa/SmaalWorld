import { OrbitControls } from "@react-three/drei";
import { Physics, Debug } from "@react-three/rapier";
import Lights from "./Lights.js";
import World from "./World.js";
import Player from "./Player.js";

export default function Experience() {
  return (
    <>
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
