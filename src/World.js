import * as THREE from "three";
import { Physics, RigidBody, interactionGroups } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export default function World() {
  /*
  const model = useLoader(GLTFLoader, "./models/cyl.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    loader.setDRACOLoader(dracoLoader);
  });
  */

  /**
   * Controls
   */
  //<primitive object={model.scene} />

  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const worldPosition = body.current.translation();
    console.log(worldPosition.x);

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 900 * delta;
    const torqueStrength = 400 * delta;

    if (worldPosition.x > -1.5 && rightward) {
      impulse.x -= impulseStrength;
    }

    if (worldPosition.x < 1.5 && leftward) {
      impulse.x += impulseStrength;
    }

    body.current.applyImpulse(impulse);
    //body.current.applyTorqueImpulse(torque);

    /*
    Camera;
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(worldPosition);
    cameraPosition.z += 16.25; //6.25
    cameraPosition.y += 0.65; //0.65
    
    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(worldPosition);
    cameraTarget.y += 1.7;
    
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);
    */
  });

  return (
    <>
      <RigidBody
        ref={body}
        colliders="hull"
        type="dynamic"
        enabledTranslations={[true, false, false, true]}
        enabledRotations={[false, false, false, false]}
        linearDamping={3}
        angularDamping={3}
        collisionGroups={interactionGroups(1)}
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
