import * as THREE from "three";
import { Attractor, RigidBody, BallCollider } from "@react-three/rapier";
import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { useControls } from "leva";

export default function Player() {
  /**
   * Debug Controls
   */
  const { gravStrengC, linDamping, angDamping } = useControls({
    //90
    //strength: 82, lin/angDamping: 100
    gravStrengC: { value: 30, min: 0, max: 200, step: 0.1 },
    linDamping: { value: 200, min: -200, max: 1000, step: 0.1 },
    angDamping: { value: 200, min: -200, max: 1000, step: 0.1 },
  });

  /**
   * Controls
   */

  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [gravPos, setGravPos] = useState([0, 0, 0]);
  const [gravStreng, setGravStreng] = useState(30);
  const [linDamp, setLinDamping] = useState(200);
  const [angDamp, setAngDamping] = useState(200);

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const worldPosition = body.current.translation();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    var impulseFactor = 100;
    var torqueFactor = 100;

    if (worldPosition.y < -0.2) {
      setLinDamping(90);
      setAngDamping(90);
    } else {
      setGravStreng(30);
      setLinDamping(200);
      setAngDamping(200);
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
      <Attractor
        position={gravPos}
        type="linear"
        strength={gravStreng}
        range={10}
      />

      <RigidBody
        gravityScale={0.5} //0.5
        ref={body}
        colliders="ball"
        position={[0, 1.5, 1]} //1.5, 6 , -2 , 0.7
        restitution={0} //0.2
        friction={50} //1
        linearDamping={linDamp} // 200
        angularDamping={angDamp} //
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
    </>
  );
}
