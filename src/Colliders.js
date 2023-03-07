import * as THREE from "three";
import { interactionGroups, CuboidCollider } from "@react-three/rapier";

export default function Colliders() {
  return (
    <>
      <CuboidCollider
        collisionGroups={interactionGroups(1, 2)}
        scale={0.5}
        args={[0.4, 0.9, 0.5]}
        position={[0, -1, 1.1]}
        onContactForce={() => console.log("HI2!")}
      />
    </>
  );
}
