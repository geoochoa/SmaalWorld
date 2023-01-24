import * as THREE from "three";
import { Attractor, RigidBody, BallCollider } from "@react-three/rapier";
import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRef, useState } from "react";

export default function Player() {
  /**
   * Controls
   */

  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [gravPos, setGravPos] = useState([0, 0, 0]);

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const worldPosition = body.current.translation();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    var impulseFactor = 100;
    var torqueFactor = 100;

    /* Need to fix movement on lower y axis space
    depending on world position . y
    impulse and torque need to be stronger when in lower y space
    or something needs to be stronger
    gravity weighing down ball may be affecting impulse/torque
     Observations:
      0.60 < y < 2.50  (Normal Speed [100]) 
     -1.27 < y < 0.60  (Slow)
     -2.50 < y < -1.27 (Unmoveable)
    then for moving horizontal, move attractor like i did with cylinder
    */

    if (worldPosition.y < 0.65) {
      //console.log(Math.abs(worldPosition.y) * 10);
      impulseFactor -= Math.abs(worldPosition.y) * 100;
      torqueFactor -= Math.abs(worldPosition.y) * 100;
    }

    const impulseStrength = impulseFactor * delta;
    const torqueStrength = torqueFactor * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (worldPosition.x < 3 && rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;

      setGravPos([worldPosition.x, 0, 0]);
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (worldPosition.x > -3 && leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;

      setGravPos([worldPosition.x, 0, 0]);
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);
  });

  return (
    <>
      <Attractor position={gravPos} type="linear" strength={30} range={10} />

      <RigidBody
        gravityScale={0.5} //0.5
        ref={body}
        colliders="ball"
        position={[0, 1.5, 6]} //1.8
        restitution={0} //0.2
        friction={0} //1
        linearDamping={200} //30
        angularDamping={200} //.5
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
    </>
  );
}
