import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRef } from "react";

export default function World() {
  /**
   * Controls
   */

  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const worldPosition = body.current.translation();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 400 * delta;
    const torqueStrength = 300 * delta;

    console.log(worldPosition);

    if (forward) {
      torque.x += torqueStrength;
    }

    if (worldPosition.x > -2 && rightward) {
      impulse.x -= impulseStrength;
    }

    if (backward) {
      torque.x -= torqueStrength;
    }

    if (worldPosition.x < 2 && leftward) {
      impulse.x += impulseStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);

    /**
     * Camera
     */
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(worldPosition);
    cameraPosition.z += 6.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(worldPosition);
    cameraTarget.y += 1;

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);
  });

  return (
    <>
      <RigidBody
        ref={body}
        colliders="hull"
        type="dynamic"
        enabledTranslations={[true, false, false, true]}
        enabledRotations={[true, false, false, true]}
        linearDamping={3}
        angularDamping={3}
      >
        <mesh
          receiveShadow
          position={[0, 0, 0]}
          rotation-z={-Math.PI * 0.5}
          scale={2}
        >
          <cylinderGeometry attach="geometry" args={[1, 1, 4.5, 32, 1, true]} />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
      </RigidBody>
    </>
  );
}
