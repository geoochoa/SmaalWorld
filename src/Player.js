import * as THREE from "three";
import { RigidBody, interactionGroups } from "@react-three/rapier";

export default function Player() {
  /**
   * Controls
   */

  return (
    <>
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 1, 2.1]}
        collisionGroups={interactionGroups(0)}
      >
        <mesh castShadow scale={0.4}>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
    </>
  );
}
