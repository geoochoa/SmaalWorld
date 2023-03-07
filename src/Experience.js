import { Physics, Debug } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import Lights from "./Lights.js";
import World from "./World.js";
import Player from "./Player.js";
import { Suspense } from "react";

/*
 */

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <Suspense>
        <Physics gravity={[0, -0.1, 0]}>
          <Debug />
          <Lights />
          <World />
          <Player />
        </Physics>
      </Suspense>
    </>
  );
}
