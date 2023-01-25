import * as THREE from "three";
import { Attractor, RigidBody, interactionGroups } from "@react-three/rapier";
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

    /*
    if (worldPosition.y < -0.2) {
      const dampFactor = 200 - Math.abs(worldPosition.y) * 40;
      setGravStreng(30);
      setLinDamping(dampFactor);
      setAngDamping(dampFactor);
    } else {
      setGravStreng(30);
      setLinDamping(200);
      setAngDamping(200);
    }*/

    const impulseStrength = impulseFactor * delta;
    const torqueStrength = torqueFactor * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);
  });

  return (
    <>
      <Attractor
        type="linear"
        strength={gravStreng}
        range={10}
        collisionGroups={interactionGroups(0, 0)}
      />

      <RigidBody
        gravityScale={0.5}
        ref={body}
        colliders="ball"
        position={[0, 1.5, 1]}
        restitution={1}
        friction={1}
        linearDamping={linDamp}
        angularDamping={angDamp}
        collisionGroups={interactionGroups(0)}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
    </>
  );
}
