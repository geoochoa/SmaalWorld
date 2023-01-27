import * as THREE from "three";
import { RigidBody, interactionGroups } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

export default function World() {
  /*
   */
  const model = useGLTF("./models/cyl.glb");
  const house = useGLTF("./models/house.glb");
  /**
   * Controls
   */

  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const worldPosition = body.current.translation();
    console.log(worldPosition.x);

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 400 * delta;
    const torqueStrength = 500 * delta;

    if (backward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (forward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (worldPosition.x > -2 && rightward) {
      impulse.x -= impulseStrength;
    }

    if (worldPosition.x < 2 && leftward) {
      impulse.x += impulseStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);

    /*
    Camera;
    */
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(worldPosition);
    cameraPosition.z += 6.25; //6.25
    cameraPosition.y += 0.65; //0.65

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(worldPosition);
    cameraTarget.y += 1.7;

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
        collisionGroups={interactionGroups(1)}
      >
        <primitive
          scale={2}
          rotation-y={-Math.PI * 0.5}
          position={[0, 0, 0]}
          object={model.scene}
        />

        <primitive
          scale={2}
          rotation-y={-Math.PI * 0.5}
          //rotation-z={Math.PI / 6}
          position={[0, -0.65, 0]} //0, -0.65, 0 => [0, -0.5, 1.2]
          object={house.scene}
        />
      </RigidBody>
    </>
  );
}
