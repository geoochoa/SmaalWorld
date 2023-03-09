import "./style.css";
import { Physics } from "@react-three/rapier";
import Lights from "./Lights.js";
import World from "./World.js";
import Player from "./Player.js";

export default function Experience() {
  return (
    <>
      <Physics gravity={[0, -0.1, 0]}>
        <Lights />
        <World />
        <Player />
      </Physics>
    </>
  );
}
