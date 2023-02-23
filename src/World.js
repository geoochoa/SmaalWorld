import * as THREE from "three";
import { RigidBody, interactionGroups } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
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

  useFrame((state, delta) => {
    const worldPosition = body.current.translation();

    /*
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
        <primitive
          scale={2}
          rotation-y={-Math.PI * 0.5}
          position={[0, 0, 0]}
          object={model.scene}
        />
      </RigidBody>
    </>
  );
}
