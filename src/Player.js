import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";

export default function Player() {
  /**
   * Debug Controls
   */
  const { posX, posY, posZ } = useControls({
    posX: { value: 0, min: -10, max: 10, step: 0.1 },
    posY: { value: 2.2, min: -10, max: 10, step: 0.1 }, //0  1 2
    posZ: { value: 0, min: -10, max: 10, step: 0.1 },
  }); //-3.3, 2, 1.3

  const { camY, camZ } = useControls({
    camY: { value: 0.65, min: -20, max: 20, step: 0.1 },
    camZ: { value: 6.25, min: -20, max: 20, step: 0.1 },
  }); //-3.3, 2, 1.3

  const { tarY, tarZ } = useControls({
    tarY: { value: 0.7, min: -20, max: 20, step: 0.1 },
    tarZ: { value: 0, min: -20, max: 20, step: 0.1 },
  }); //-3.3, 2, 1.3

  const player = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [smoothedCameraPos] = useState(() => new THREE.Vector3());
  const [smoothedCameraTar] = useState(() => new THREE.Vector3());

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const worldPosition = player.current.translation();

    const impulse = { x: 0, y: 0, z: 0 };

    // Makes a copy of the players position but negated to apply inward force towards planet
    const tmp = new THREE.Vector3(
      -worldPosition.x,
      -worldPosition.y,
      -worldPosition.z
    );
    tmp.normalize(); // Brings in Range [0, 1]
    //tmp.multiplyScalar(0.1); // Scale

    const impulseStrength = 10 * delta;

    // Corrects Gravity Vector when X-Movement combined with Y/Z-Movement
    // [***$***] I should find a better way to calculate this factor
    // This essentially makes sure we apply the correct amt impulse to keep
    //    player grounded while moving on the x axis
    var xFactor = 1 + Math.abs(worldPosition.x * 0.21) + 0.03; //
    if (Math.round(xFactor) == 0) xFactor = 1; // Divide by Zero Prevention

    //ContinousGravity Vectors
    impulse.y += impulseStrength * tmp.y;
    impulse.z += impulseStrength * tmp.z;

    if (forward) {
      const quadr = worldPosition.z * worldPosition.y;
      // First two cases account for cases where we are at either of the 4 poles ([0,x], [0, -x], [0,y], [0,-y])
      // For movement on a sphere, forward movement from impulse depends where we are
      // [***$***] Definitely a way to clean this up, making so these 2 cases appear on bottom cases
      // [***$***] Can possible combine Fwd and Bwd logic, same with conditionals
      if (worldPosition.z > -0.7 && worldPosition.z < 0.7) {
        impulse.z += impulseStrength * tmp.y;
      } else if (worldPosition.y > -0.7 && worldPosition.y < 0.7) {
        impulse.y += impulseStrength * -tmp.z;
      } else if (quadr <= 0) {
        //Q1, Q3
        impulse.z +=
          (-impulseStrength * (worldPosition.y <= 0 ? -1 : 1)) / xFactor; //ternary oprs flip movement if lower y space
      } else if (quadr > 0) {
        //Q2, Q4

        impulse.y +=
          (impulseStrength * (worldPosition.y < 0 ? -1 : 1)) / xFactor;
      }
    }

    if (worldPosition.x < 2.869 && rightward) {
      impulse.x += impulseStrength;
    }
    if (worldPosition.x > -2.869 && leftward) {
      impulse.x -= impulseStrength;
    }

    if (backward) {
      const quadr = worldPosition.z * worldPosition.y;
      // Similar to Fwd, But flipped
      if (worldPosition.z > -0.7 && worldPosition.z < 0.7) {
        impulse.z -= impulseStrength * tmp.y; //tmp.y negative
      } else if (worldPosition.y > -0.7 && worldPosition.y < 0.7) {
        impulse.y -= impulseStrength * -tmp.z;
      } else if (quadr <= 0) {
        //Q1, Q3
        impulse.y -=
          (-impulseStrength * (worldPosition.y <= 0 ? -1 : 1)) / xFactor; //ternary oprs flip movement if lower y space
      } else if (quadr > 0) {
        //Q2, Q4
        impulse.z +=
          (impulseStrength * (worldPosition.y < 0 ? -1 : 1)) / xFactor;
      }
    }

    player.current.applyImpulse(impulse);

    /**
     * Camera
    console.log(
      "Real   Pos",
      worldPosition.y.toFixed(2),
      worldPosition.y.toFixed(2)
      );
      console.log(
        "Behind Pos",
        worldPosition.y.toFixed(2),
        worldPosition.y.toFixed(2)
        );
        
        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(worldPosition);
        cameraPosition.z = camZ; //6.25
        cameraPosition.y += camY; //0.65
        
        const cameraTarget = new THREE.Vector3();
        cameraTarget.copy(worldPosition);
        cameraTarget.y += tarY; //1.7
        cameraTarget.z += tarZ;
        //cameraTarget.z += 10;
        
        smoothedCameraPos.lerp(cameraPosition, 0.5);
        smoothedCameraTar.lerp(cameraTarget, 0.5);
        
        state.camera.position.copy(smoothedCameraPos);
        state.camera.lookAt(smoothedCameraTar);
        */
  });

  /**
   * Controls
   */

  return (
    <>
      <RigidBody
        mass={1}
        ref={player}
        type="dynamic"
        colliders="hull"
        position={[posX, posY, posZ]} //0, 1.5, 2.1 =>
        enabledRotations={[false, false, false, false]}
        //restitution={0.2} //0.2
        //friction={1} //1`
        linearDamping={5} //30
      >
        <mesh castShadow scale={0.4}>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
    </>
  );
}
