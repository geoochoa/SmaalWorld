import * as THREE from "three";
import {
  RigidBody,
  interactionGroups,
  CylinderCollider,
  CuboidCollider,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  Cylinder,
  useGLTF,
  useKeyboardControls,
  useTexture,
} from "@react-three/drei";
import Colliders from "./Colliders.js";

export default function World() {
  /*
   */
  const { nodes } = useGLTF("./models/world.glb");
  const bakedTexture = useTexture("./models/baked.jpg");
  bakedTexture.flipY = false;
  // console.log(nodes);

  /**
   * Controls
   */

  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    const worldPosition = body.current.translation();
    const { forward, backward, leftward, rightward } = getKeys();
    const xBounds = 1.5;

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 30 * delta;
    const torqueStrength = 20 * delta;

    if (backward) {
      torque.x -= torqueStrength;
    }

    if (forward) {
      torque.x += torqueStrength;
    }
    if (worldPosition.x > -xBounds && rightward) {
      impulse.x -= impulseStrength;
    }

    if (worldPosition.x < xBounds && leftward) {
      impulse.x += impulseStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);
  });

  /*

*/
  return (
    <>
      <RigidBody
        collisionGroups={interactionGroups(0, 1)}
        ref={body}
        type="dynamic"
        colliders={false}
        angularDamping={5}
        linearDamping={5}
        enabledRotations={[true, false, false, false]}
        enabledTranslations={[true, false, false, false]}
        rotation={[-Math.PI * 0.5, 0, -Math.PI * 0.5]}
        position={[0, 0, 0]}
      >
        <Colliders />
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </RigidBody>
    </>
  );
}
