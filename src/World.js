import * as THREE from "three";
import { BallCollider, Physics, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
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
  useFrame((state, delta) => {
    const worldPosition = body.current.translation();

    /*
    Camera
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(worldPosition);
    cameraPosition.z += 6.25; //6.25
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
        enabledTranslations={[false, false, false, false]}
        enabledRotations={[false, false, false, false]}
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
