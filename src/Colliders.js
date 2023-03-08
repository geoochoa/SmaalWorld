import * as THREE from "three";
import {
  interactionGroups,
  CuboidCollider,
  CylinderCollider,
} from "@react-three/rapier";

export default function Colliders() {
  return (
    <>
      <CylinderCollider scale={0.5} args={[4.5, 2, 10]} position={[0, 0, 0]} />
      <CuboidCollider
        mass={0}
        collisionGroups={interactionGroups(1, 2)}
        scale={0.5}
        args={[0.4, 0.9, 0.5]}
        position={[0, -1, 1.25]}
        onContactForce={() => console.log("HI2!")}
      />
    </>
  );
}
